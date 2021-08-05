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
            console.log(response.data.orders_products)
            setIsLoaded(true)

        }
        fetch()
    }, [])


    const renderOrderDetails = () => {
        let list = []
        for (let o of orderDetails) {
            list.push(
                <tr key={o.id}>
                    <td>{o.product.name}</td>
                    <td>{o.quantity}</td>
                    <td>${o.product.cost / 100}</td>
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
                <div className="order-details">
                    <h1>Order Information</h1>
                    <h1>Displaying Order {orderInfo.id}</h1>
                    <p>User ID: {orderInfo.user_id}</p>
                    <p>Receiver Name: {orderInfo.reciever_name}</p>
                    <p>Receiver Address: {orderInfo.receiver_address}</p>
                    <p>Date: {orderInfo.order_date.slice(0, 10)}</p>
                    <p>Total Cost: ${orderInfo.total_cost / 100}</p>
                    <h1>Product Details</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderOrderDetails()}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}