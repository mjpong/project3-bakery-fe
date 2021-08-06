import React, { useEffect, useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import axios from "axios";
import config from "../config";
const BASE_URL = config.BASE_URL;


export default function EditUserProfile() {

    const history = useHistory();
    const location = useLocation()
    const [loaded, setLoaded] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState({})
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [dob, setDob] = useState("")
    const [phone, setPhone] = useState("")


    useEffect(() => {
        const fetch = async () => {
            const localToken = localStorage.getItem('accessToken')
            const response = await axios.get(BASE_URL + "/api/users/profile", {
                headers: {
                    authorization: "Bearer " + localToken
                }
            })
            setUser(response.data)
            setName(response.data.name)
            setAddress(response.data.address)
            setEmail(response.data.email)
            setDob(response.data.dob.slice(0, 10))
            setPhone(response.data.phone)
            setLoggedIn(true);
            setLoaded(true);
        }
        fetch()
    }, [])



    const updateProfile = async () => {
        const response = await axios.post(BASE_URL + "/api/users/update", {
            "name": name,
            "email": email,
            "address": address,
            "password": password,
            "phone": phone,
            "dob": dob
        })
    }

    if (loaded === false) {
        return (
            <img className="loading" src="https://scarto.cachefly.net/labaking.com/img/hloading-alt.gif" alt="loading" />
        )
    } else if (loaded === true && loggedIn === false) {
        history.push("/login")
    } else {
        return (
            <React.Fragment>
                <h1 className="text-center mt-3">Edit Profile</h1>
                <hr></hr>
                <div className="update-profile-form">
                    <div className="row create-account-wrapper">
                        <div className="create-account-form col-lg-7 col-12">
                            <div className="form-label">Name: </div>
                            <input className="form-control"
                                name="name" type="text"
                                placeholder="Name"
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="create-account-form col-lg-7 col-12">
                            <div className="form-label">Email: </div>
                            <input className="form-control"
                                name="email" type="text"
                                placeholder="Email"
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="create-account-form col-lg-7 col-12">
                            <div className="form-label">Password: </div>
                            <input className="form-control"
                                name="password" type="password"
                                placeholder="Password"
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="create-account-form col-lg-7 col-12">
                            <div className="form-label">Confirm Password: </div>
                            <input className="form-control"
                                name="confirmPassword" type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <div className="create-account-form col-lg-7 col-12">
                            <div className="form-label">Phone: </div>
                            <input className="form-control"
                                name="phone" type="number"
                                placeholder="Phone"
                                value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="create-account-form col-lg-7 col-12">
                            <div className="form-label">Date Of Birth: </div>
                            <input className="form-control"
                                name="dob" type="date"
                                placeholder="Date of Birth"
                                value={dob} onChange={(e) => setDob(e.target.value)} />
                        </div>
                        <div className="create-account-form col-12">
                            <div className="form-label">Address: </div>
                            <input className="form-control"
                                name="address" type="text"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="mt-3">
                            <button className="btn allbtn" onClick={updateProfile}>Update Profile</button>
                            <Link className="btn allbtn mx-3" to="/profile"> Cancel </Link>
                        </div>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}