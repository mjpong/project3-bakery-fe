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
        const fetch = async () => {
            const response = await axios.get(BASE_URL + "/api/shoppingcart/" + localStorage.getItem("id"))
            setShoppingCartItem(response.data)
            setLoaded(true)
            
        }
        fetch()
    }, [])


    const renderCart = () => {
        let list = []
        shoppingCartItem.map(p => {
            console.log(p)
            list.push(
                <React.Fragment>
                    <h3> Cinnamon Roll: {p.product.name} </h3>
                    <p> Description: {p.product.description} </p>
                    <p> Quantity: {p.quantity}</p>
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
    
    const checkOut = () => {
        <Link to="/checkout"></Link>
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
                
                <Link to="/checkout"> <button className = "btn btn-primary">Checkout </button></Link>
            </React.Fragment>
        )
    }


}
