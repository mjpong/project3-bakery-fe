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
        const response = await axios.post(BASE_URL + "/api/shoppingcart/increase/" + id, "", {
            headers: {
                authorization: "Bearer " + localStorage.getItem('accessToken')
            }
        })

        fetch()
    }

    const decreaseQ = async (id) => {
        const response = await axios.post(BASE_URL + "/api/shoppingcart/decrease/" + id, "", {
            headers: {
                authorization: "Bearer " + localStorage.getItem('accessToken')
            }
        })
        fetch()
    }

    // delete item
    const deleteItem = async (id) => {
        await axios.delete(BASE_URL + "/api/shoppingcart/remove/" + id, {
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
                    <div className="cart-each-wrapper row">
                        <div className="col-lg-4">
                            <div className="cart-item row">
                                <div className="cart-image col-lg-6" style={{
                                    backgroundImage: `url(${p.product.image})`
                                }}>
                                </div>
                                <div className="cart-text col-lg-6">
                                    <div>
                                        <p className="mt-1 mb-0"> {p.product.name} </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cart-price col-lg-2">
                            <p className="mb-0"> ${p.product.cost / 100}</p>
                        </div>
                        <div className="cart-quantity-box col-lg-2">
                            <button className="cart-update"
                                onClick={() => increaseQ(p.id)}
                                value={p.quantity}><i class="far fa-plus-square fa-lg"></i></button>
                            {p.quantity}
                            <button className="cart-update "
                                onClick={() => decreaseQ(p.id)}
                                value={p.quantity}><i class="far fa-minus-square fa-lg"></i></button>
                        </div>
                        <div className="cart-total col-lg-2">
                            <p className="mb-0"> ${p.product.cost * p.quantity / 100}</p>
                        </div>
                        <div className="cart-delete col-lg-2">
                            <button className="cart-delete mb-1" onClick={() => deleteItem(p.id)}><i class="fas fa-trash fa-lg"></i></button>

                        </div>
                    </div>
                    <hr></hr>
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
            <div>
                <img className="loading" src="https://scarto.cachefly.net/labaking.com/img/hloading-alt.gif" alt="loading" />
            </div>

        )
    } else {
        return (
            <React.Fragment>
                <h1 className="text-center my-4"> My Shopping Cart</h1>

                <div className="row container-fluid">
                    <div className="cart-items-wrapper col-lg-9 col-sm-12 p-3">
                        <div className="row cart-header">
                            <div className="col-lg-4">
                                <p>Product</p>
                            </div>
                            <div className="col-lg-2">
                                <p>Price</p>
                            </div>
                            <div className="col-lg-2">
                                <p>Qty</p>
                            </div>
                            <div className="col-lg-2">
                                <p>Total</p>
                            </div>
                            <div className="col-lg-2">
                                <p>Delete</p>
                            </div>
                            <hr></hr>
                        </div>
                        {renderCart()}
                    </div>
                    <div className="cart-cost-wrapper col-lg-3 col-sm-12 p-3">
                        <p className="cart-header mt-5"> SUBTOTAL: </p>
                        <div className="checkout-wrapper">
                            <p>  ${(totalCost / 100)} </p>
                            <Link className="btn allbtn" to="/checkout"> Checkout </Link>

                        </div>
                        <p className="payment-terms"> Payment by Stripe <br></br>
                            Shipping and tax calculated at checkout
                        </p>
                    </div>
                </div>

            </React.Fragment>
        )
    }


}
