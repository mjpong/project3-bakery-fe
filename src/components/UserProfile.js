import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import config from "../config";
const BASE_URL = config.BASE_URL;


export default function UserProfile() {

    const history = useHistory();
    const [loaded, setLoaded] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState({})

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(BASE_URL + "/api/users/profile", {
                headers: {
                    authorization: "Bearer " + localStorage.getItem('accessToken')
                }
            })
            setUser(response.data)
            setLoggedIn(true)
            setLoaded(true)
        }
        fetch();
    }, [])


    if (loaded === false) {
        return (
            <img className="loading" src="https://scarto.cachefly.net/labaking.com/img/hloading-alt.gif" alt="loading" />
        )
    } else if (loaded === true && loggedIn === false) {
        history.push("/login")
    } else {
        return (
            <React.Fragment>
                <div className="profile-wrapper p-2">
                    <h1 className="text-center mt-3">My Profile</h1>
                    <hr></hr>
                    <div className="row p-3">
                        <div className="col-6 leftcol">
                            <ul class="profile-list">
                                <li>Name:</li>
                                <li>Email:</li>
                                <li>Date of Birth:</li>
                                <li>Contact Number:</li>
                                <li>Address:</li>
                            </ul>
                        </div>
                        <div className="col-6">
                            <ul class="profile-list rightcol">
                                <li>{user.name}</li>
                                <li>{user.email}</li>
                                <li>{user.dob.slice(0, 10)}</li>
                                <li>{user.phone}</li>
                                <li>{user.address}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="click-edit my-3">
                            <Link className="btn allbtn" to="/profile/edit"> Edit Profile </Link>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}