import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import config from "../config";
const BASE_URL = config.BASE_URL;

export default function ShoppingCart() {
    const history = useHistory();
    const [loaded, setLoaded] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [increaseFailed, setIncreaseFailed] = useState(false)
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
        setLoggedIn(true)
        setLoaded(true)
    }

    //quantity
    const increaseQ = async (id) => {
        const response = await axios.post(BASE_URL + "/api/shoppingcart/increase/" + id, "", {
            headers: {
                authorization: "Bearer " + localStorage.getItem('accessToken')
            }
        })
        console.log(response.data)
        if (response.data.message === "Cannot increase item") {
            setIncreaseFailed(true)
        } else {
            setIncreaseFailed(false)
        }
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
                    <tr key={p.id}>
                        <td className="align-middle">
                            <div className="cart-image mt-1" style={{
                                backgroundImage: `url(${p.product.image})`
                            }}>
                            </div>
                            <p className="mt-1 mb-0"> {p.product.name} </p>
                        </td>
                        <td className="align-middle">
                            <p className="mb-0"> ${p.product.cost / 100}</p>
                        </td>
                        <td className="align-middle">
                            <div className="cart-quantity-box">
                                <button className="cart-update"
                                    onClick={() => increaseQ(p.id)}
                                    value={p.quantity}><i class="far fa-plus-square fa-lg"></i></button>
                                {p.quantity}
                                <button className="cart-update "
                                    onClick={() => decreaseQ(p.id)}
                                    value={p.quantity}><i class="far fa-minus-square fa-lg"></i></button>
                            </div>
                        </td>
                        <td className="align-middle">
                            <p className="mb-0"> ${p.product.cost * p.quantity / 100}</p>
                        </td>
                        <td className="align-middle">
                            <div className="cart-delete">
                                <button className="cart-delete mb-1" onClick={() => deleteItem(p.id)}><i class="fas fa-trash fa-lg"></i></button>
                            </div>
                        </td>
                    </tr>
                </React.Fragment>
            )
        })
        if (list[0] === undefined) {
            list.push(
                <React.Fragment>
                    <tr>
                        <td></td>
                        <td></td>
                        <div className="col-sm-12 cart-header text-center"> <img src="https://i.imgur.com/dCdflKN.png" width="130" height="130" class="img-fluid mb-4 mr-3" />
                            <h5><strong>Your Cart is Empty</strong></h5>
                            <p>Add something to make me happy!</p>
                        </div>
                    </tr>
                </React.Fragment>

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
    } else if (loaded === true && loggedIn === false) {
        history.push("/login")
    } else {
        return (
            <React.Fragment>
                <h1 className="text-center my-4"> My Shopping Cart</h1>

                <div className="row container-fluid">
                    <div className="increase-failed" style={{ display: increaseFailed === true ? "block" : "none" }}>
                        <p>Sorry, there is only left in stock.</p>
                    </div>
                    <div className="cart-items-wrapper table-responsive-sm col-lg-9 col-sm-12 p-3">
                        <table className="table order-product-table">
                            <thead>
                                <tr>
                                    <th className="cart-header">Product</th>
                                    <th className="cart-header">Price</th>
                                    <th className="cart-header">Quantity</th>
                                    <th className="cart-header">Delete</th>
                                    <th className="cart-header">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderCart()}
                            </tbody>
                        </table>
                    </div>
                    <div className="cart-cost-wrapper col-lg-3 col-sm-12 p-3">
                        <p className="cart-header mt-lg-5 mt-sm-3 mt-md-3"> SUBTOTAL: </p>
                        <div className="checkout-wrapper">
                            <p>  ${(totalCost / 100)} </p>
                            <Link className="btn allbtn" to="/checkout"> Checkout </Link>
                        </div>
                        <p className="payment-terms"> Payment by Stripe <br></br>
                            Shipping and tax calculated at checkout
                        </p>
                    </div>
                    <div className="mt-3">
                        <Link className="btn allbtn" to="/products"> Continue Browsing </Link>
                    </div>
                </div>

            </React.Fragment>
        )
    }

}
