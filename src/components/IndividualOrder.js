import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useLocation } from "react-router-dom";
import config from "../config";
const BASE_URL = config.BASE_URL;

export default function IndividualOrder() {
    const [params] = useState(new URLSearchParams(useLocation().search))
    const { order_id } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [orderInfo, setOrderInfo] = useState([])
    const [orderDetails, setOrderDetails] = useState([])
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const [paymentFailed, setPaymentFailed] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            let status = params.get("payment");
            if (status === "success") {
                setPaymentSuccess(true)
            }
            if (status === "failed") {
                setPaymentFailed(true)
            }
            const response = await axios.get(BASE_URL + "/api/orders/" + order_id, {
                headers: {
                    authorization: "Bearer " + localStorage.getItem('accessToken')
                }
            })
            setOrderInfo(response.data)
            setOrderDetails(response.data.orders_products)
            setIsLoaded(true)

        }
        fetch()
    }, [order_id, params])


    const renderOrderDetails = () => {
        let list = []
        for (let p of orderDetails) {
            list.push(

                <tr key={p.id}>
                    <td className="align-middle">
                        <div className="cart-image mt-1 " style={{
                            backgroundImage: `url(${p.product.image})`
                        }}>
                        </div>
                        <p className="mb-0 mt-1"> {p.product.name} </p>
                    </td>
                    <td className="align-middle">
                        <p> ${p.product.cost / 100}</p>
                    </td>
                    <td className="align-middle">
                        <p> {p.quantity}</p>
                    </td>
                    <td className="align-middle">
                        <p> ${p.product.cost * p.quantity / 100}</p>
                    </td>
                </tr>
            )
        }
        return list

    }


    if (isLoaded === false) {
        return (
            <img className="loading" src="https://scarto.cachefly.net/labaking.com/img/hloading-alt.gif" alt="loading" />
        )
    } else {
        return (
            <React.Fragment>
                <div className="payment-successful" style={{ display: paymentSuccess === true ? "block" : "none" }}>
                    <h4>Payment Successful</h4>
                </div>
                <div className="payment-failed" style={{ display: paymentFailed === true ? "block" : "none" }}>
                    <h4>Payment Failed, Order Not Successful</h4>
                </div>
                <div className=" container order-details">
                    <h1 className="mt-4 text-center">Order {orderInfo.id} Details </h1>
                    <hr></hr>

                    <div className="table-responsive-sm user-order-wrapper">
                        <table className="table user-order-table">
                            <tbody>
                                <tr>
                                    <td className="cart-header">
                                        Receiver Name:
                                    </td>
                                    <td>
                                        {orderInfo.receiver_name}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="cart-header">
                                        Receiver Address:
                                    </td>
                                    <td>
                                        {orderInfo.receiver_address}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="cart-header">
                                        Order Date:
                                    </td>
                                    <td>
                                        {orderInfo.order_date.slice(0, 10)}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="cart-header">
                                        Total Order Cost:
                                    </td>
                                    <td>
                                        ${orderInfo.total_cost / 100}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="cart-header">
                                        Order Status:
                                    </td>
                                    <td>
                                        {orderInfo.order_status.status}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="cart-header">Completion Date:</td>
                                    <td>{orderInfo.completion_date == null ? "In Progress" : orderInfo.completion_date.slice(0, 10)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="text-center mt-3">Product Details</h3>
                    <hr></hr>
                    <div className="container table-responsive-sm p-3">
                        <table className="table order-product-table">
                            <thead>
                                <tr>
                                    <th className="cart-header">Product</th>
                                    <th className="cart-header">Price</th>
                                    <th className="cart-header">Quantity</th>
                                    <th className="cart-header">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderOrderDetails()}
                            </tbody>
                        </table>
                    </div>
                    <Link className="btn allbtn" to="/orders"> Back </Link>
                </div>
            </React.Fragment >
        )
    }
}