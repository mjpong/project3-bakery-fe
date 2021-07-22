import React, { useContext, useState } from "react"
import axios from "axios"
import { useHistory, Link } from "react-router-dom"
import config from "../config"
const BASE_URL = config.BASE_URL

export default function CreateAccount() {

    const history = useHistory()
    const [formState, setFormState] = useState({
        'name': '',
        'email': '',
        'address': "",
        'password': '',
        'confirmPassword': '',
        'dob': '',
        'phone':''

    })
    const [registerState, setRegisterState] = useState(false)

    const updateFormField = (e) => {
        setFormState(
            {
                ...formState, [e.target.name]: e.target.value
            }
        )
    }
    
    const createAccount = async () => {
        const response = await axios.post(BASE_URL + '/api/users/register', formState)
        if (response.data !== "Unable to create user") {
            history.push("/login?email=" + formState.email)
        } else {
            setRegisterState(false)
        }

    }

    return (
        <React.Fragment>
            <h1> Create New Account</h1>
            <div className="row">
                <div className="create-account-form col-7">
                    <div className="form-label">Name: </div>
                    <input className="form-control"
                        name="name" type="text"
                        placeholder="Name"
                        value={formState.fullname}
                        onChange={updateFormField} />
                </div>
                <div className="create-account-form col-7">
                    <div className="form-label">Email: </div>
                    <input className="form-control"
                        name="email" type="text"
                        placeholder="Email"
                        value={formState.email}
                        onChange={updateFormField} />
                </div>
                <div className="create-account-form col-7">
                    <div className="form-label">Password: </div>
                    <input className="form-control"
                        name="password" type="password"
                        placeholder="Password"
                        value={formState.password}
                        onChange={updateFormField} />
                </div>
                <div className="create-account-form col-7">
                    <div className="form-label">Confirm Password: </div>
                    <input className="form-control"
                        name="confirmPassword" type="password"
                        placeholder="Confirm Password"
                        value={formState.confirmPassword}
                        onChange={updateFormField} />
                </div>
                <div className="create-account-form col-7">
                    <div className="form-label">Phone: </div>
                    <input className="form-control"
                        name="phone" type="number"
                        placeholder="Phone"
                        value={formState.phone}
                        onChange={updateFormField} />
                </div>
                <div className="create-account-form col-7">
                    <div className="form-label">Date Of Birth: </div>
                    <input className="form-control"
                        name="dob" type="date"
                        placeholder="Date of Birth"
                        value={formState.dob}
                        onChange={updateFormField} />
                </div>
                <div className="create-account-form col-12">
                    <div className="form-label">Address: </div>
                    <input className="form-control"
                        name="address" type="text"
                        placeholder="Address"
                        value={formState.address}
                        onChange={updateFormField} />
                </div>
                
                
                
            </div>
            <button className="btn btn-primary" onClick={createAccount}>Create Account</button>
        </React.Fragment>
    )
}