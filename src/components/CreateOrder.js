import React, { useEffect, useState } from "react"
import axios from "axios"
import config from "../config"
const BASE_URL = config.BASE_URL

export default function CreateOrder() {

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")

    useEffect(() => {
        const fetch = async () => {
            const localToken = localStorage.getItem('accessToken')
            const response = await axios.get(BASE_URL + "/api/users/profile", {
                headers: {
                    authorization: "Bearer " + localToken
                }
            })

            setName(response.data.name);
            setAddress(response.data.address)
        }
        fetch()
    }, [])

    const checkOut = async () => {
        await window.location.assign(BASE_URL + "/api/checkout" + "?token=" + localStorage.getItem('accessToken') + "&address=" + address + "&name=" + name, {
            headers: {
                authorization: "Bearer " + localStorage.getItem('accessToken')
            }
        })
    }

    return (
        <React.Fragment>
            <div className="container p-5">
                <div>
                    <h1 className="mb-4 text-center"> DELIVERY ADDRESS </h1>
                    <hr></hr>
                </div>
                <div className="row">
                    <p>Please fill out receiver details accordingly if different from user: </p>
                    <div className="create-account-form col-lg-5 col-md-5 col-sm-12 mb-4">
                        <div className="form-label">Name: </div>
                        <input className="form-control" type="text"
                            name="name" value={name}
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}>
                        </input>

                    </div>
                    <div className="create-account-form col-12 mb-4">
                        <div className="form-label">Address: </div>
                        <input className="form-control" type="text"
                            name="address" value={address}
                            placeholder="Address"
                            onChange={(e) => setAddress(e.target.value)}>
                        </input>
                    </div>
                    <button className="btn allbtn"
                        onClick={checkOut}>Checkout</button>
                </div>
            </div>
        </React.Fragment>
    )

}