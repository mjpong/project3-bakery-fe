import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link, useParams, useLocation } from "react-router-dom"
import config from "../config"
const BASE_URL = config.BASE_URL

export default function IndividualOrder() {
    const params = new URLSearchParams(useLocation().search);
    const { order_id } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [orderInfo, setOrderInfo] = useState([])
    const [orderDetails, setOrderDetails] = useState([])
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const [paymentFailed, setPaymentFailed] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            let status = params.get("payment");
            if (status == "success") {
                setPaymentSuccess(true)
            }
            if (status == "failed") {
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
    }, [])


    const renderOrderDetails = () => {
        let list = []
        for (let p of orderDetails) {
            list.push(

                <tr key={p.id}>
                    <td><div className="cart-image " style={{
                        backgroundImage: `url(${p.product.image})`
                    }}>
                    </div>
                    </td>
                    <td>
                        <p> {p.product.name} </p>
                    </td>
                    <td><p> ${p.product.cost / 100}</p></td>
                    <td>{p.quantity}</td>
                    <td> <p> ${p.product.cost * p.quantity / 100}</p></td>
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
                    <h2 className="mt-4">Order {orderInfo.id} Details </h2>
                    <hr></hr>
                    <div className="table-responsive-sm">
                        <table className="table user-order-table">
                            <tbody>
                                <tr>
                                    <td>
                                        Receiver Name:
                                    </td>
                                    <td>
                                        {orderInfo.reciever_name}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Receiver Address:
                                    </td>
                                    <td>
                                        {orderInfo.receiver_address}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Order Date:
                                    </td>
                                    <td>
                                        {orderInfo.order_date.slice(0, 10)}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Order Total Cost:
                                    </td>
                                    <td>
                                        ${orderInfo.total_cost / 100}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Completion Date:</td>
                                    <td>{orderInfo.completion_date == null ? "In Progress" : orderInfo.completion_date.slice(0, 10)}</td>
                                </tr>
                                <tr>
                                    <td>
                                        Order Status:
                                    </td>
                                    <td>
                                        {orderInfo.order_status.status}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2 className="text-center">Product Details</h2>
                    <hr></hr>
                    <div className="container table-responsive-sm p-3">
                        <table className="table order-product-table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderOrderDetails()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}