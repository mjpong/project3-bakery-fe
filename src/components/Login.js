import React, { useContext, useState } from "react"
import axios from "axios"
import { useHistory, Link } from "react-router-dom"
import LoginContext from "./LoginContext"
import config from "../config"
const BASE_URL = config.BASE_URL

export default function Login() {
    const history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let context = useContext(LoginContext)

    async function login(){
        const response = await axios.post(BASE_URL + "/api/users/login/", {
            'email': email,
            'password': password
        })
    }
    
    return (
        <React.Fragment>
            <h1>Login Page</h1>
            <input className="login-input" type="text" name="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
            <input className="login-input" type="password" name="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
            <button className="btn btn-primary" onClick={login}>Login</button>

        </React.Fragment>
    )
}