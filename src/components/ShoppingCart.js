import React, { useEffect, useState } from "react"
import axios from "axios"
import { useHistory, Link } from "react-router-dom"
import config from "../config"
const BASE_URL = config.BASE_URL

export default function ShoppingCart() {
    const history = useHistory();
    const [loaded, setLoaded] = useState(false)
    const [shoppingCartItem, setShoppingCartItem] = useState([])
    const [totalCost, setTotalCost] = useState(0)

    useEffect(() => {
        fetch()
    }, [])

    const fetch = async () => {
        const response = await axios.get(BASE_URL + "/api/shoppingcart", {
            headers: {
                authorization: "Bearer " + localStorage.getItem('accessToken')
            }
        })
        setShoppingCartItem(response.data)
        calculateTotal(response.data);
        setLoaded(true)
    }

    //quantity
    const increaseQ = async (id) => {
        const response = await axios.post(BASE_URL + "/api/shoppingcart/increase/"+ id, "",{
            headers: {
                authorization: "Bearer " + localStorage.getItem('accessToken')
            }
        })

        fetch()
    }

    const decreaseQ = async (id) => {
        const response = await axios.post(BASE_URL + "/api/shoppingcart/decrease/"+ id, "",{
            headers: {
                authorization: "Bearer " + localStorage.getItem('accessToken')
            }
        })
        fetch()
    }

    // delete item
    const deleteItem = async (id) => {
        await axios.delete(BASE_URL + "/api/shoppingcart/remove/"+ id, {
            headers: {
                authorization: "Bearer " + localStorage.getItem('accessToken')
            }
        })
        fetch()
    }

    const calculateTotal = (data) => {
        let subtotal = 0;
        for (let s of data) {
            subtotal += (s.product.cost * s.quantity)
        }
        setTotalCost(subtotal)
    }

    const renderCart = () => {
        let list = []
        shoppingCartItem.map(p => {
            list.push(
                <React.Fragment>
                    <div className="cart-wrapper">
                        <div className="cart-image" style={{
                            backgroundImage: `url(${p.product.image})`,
                            width: "150px",
                            height: "150px"
                        }}>PHOTO</div>
                        <h4> {p.product.name} </h4>
                        <p> Description: {p.product.description} </p>
                        <p> Unit Cost: ${p.product.cost/100}</p>
                    </div>
                    <div>
                        <button className="btn btn-success" 
                                onClick={() => increaseQ(p.id)}
                                value={p.quantity}>+</button>
                        {p.quantity}
                        <button className="btn btn-warning" 
                                onClick={() => decreaseQ(p.id)}
                                value={p.quantity}>-</button>
                    </div>
                    <button className="btn btn-danger" onClick={() => deleteItem(p.id)}>Delete Item</button>
                </React.Fragment>
            )
        })
        if (list[0] === undefined) {
            list.push(
                <div> There are no items</div>
            )
        }
        return list
    }



    if (loaded === false) {
        return (
            <p>Loading ... </p>
        )
    } else {
        return (
            <React.Fragment>
                <h1> Shopping Cart</h1>
                <div>{renderCart()}</div>
                <h4>Total Cost: {totalCost}</h4>

                <Link to="/checkout"> <button className="btn btn-primary">Checkout </button></Link>
            </React.Fragment>
        )
    }


}
