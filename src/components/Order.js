import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import config from "../config"
const BASE_URL = config.BASE_URL

export default function Order() {

    const [loaded, setLoaded] = useState(false)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(BASE_URL + "/api/orders/", {
                headers: {
                    authorization: "Bearer " + localStorage.getItem('accessToken')
                }
            })

            setOrders(response.data.reverse())
            setLoaded(true)
        }
        fetch()
    }, [])


    const renderOrders = () => {
        let list = []
        for (let o of orders) {
            list.push(
                <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.order_status.status}</td>
                    <td>{o.order_date.slice(0, 10)}</td>
                    <td>${o.total_cost / 100}</td>
                    <td>{o.completion_date == null ? "In Progress" : o.completion_date.slice(0, 10)}</td>
                    <td><Link className="allbtn btn" to={"/orders/" + o.id}>Details</Link></td>
                </tr>
            )
        }
        if (list.length === 0) {
            list.push(
                <div>
                    <p>You don't have any orders</p>
                    <div>
                        <Link className="btn allbtn" to="/products"> Continue Browsing </Link>
                    </div>
                </div>
            )
        }
        return list
    }
    return (
        <React.Fragment>
            <h1 className="m-3 text-center"> MY ORDERS </h1>
            <hr></hr>
            <div className="orders-wrapper table-responsive-sm ">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Status</th>
                            <th>Placed on</th>
                            <th>Subtotal</th>
                            <th>Completed on</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderOrders()}
                    </tbody>
                </table>
            </div>

        </React.Fragment>
    )
}