import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { useHistory, Link, useLocation } from "react-router-dom"
import LoginContext from "./LoginContext"
import config from "../config"
const BASE_URL = config.BASE_URL

export default function Login() {
    let query = new URLSearchParams(useLocation().search);
    const history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState(false)
    let context = useContext(LoginContext)

    useEffect(() => {
        if (query.get("email")) {
            setEmail(query.get("email"));
        }
    }, [])

    async function login() {
        const response = await axios.post(BASE_URL + "/api/users/login/", {
            'email': email,
            'password': password

        })
        console.log(response.status)
        if (response.status === 200) {
            localStorage.setItem("accessToken", response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            localStorage.setItem('id', response.data.id)
            context.changeLogin()
            context.changeUser(response.data.id)
            history.push('/')
        } else if (response.status === 204) {

            setLoginError(true)
        }

    }

    return (
        <React.Fragment>
            <h1 className="text-center mt-3"> LOGIN TO YOUR ACCOUNT </h1>
            <hr></hr>
            <div className="login-wrapper">
                <div className="form-label">Email: </div>
                <input className="form-control" type="text" name="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                <div className="form-label mt-3">Password: </div>
                <input className="form-control" type="password" name="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                <p className="login-error-text"
                    style={{ display: loginError === true ? "block" : "none" }}>
                    Invalid Login. Please try again.
                </p>
                <div className="mt-3">
                    <button className="btn allbtn" onClick={login}>Login</button>
                </div>
                <div className="mt-3">
                    No account? <br></br>
                    <Link className="create-account" to="/register">Create one here</Link>
                </div>

            </div>

        </React.Fragment>
    )
}