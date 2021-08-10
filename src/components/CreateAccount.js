import React, { useState } from "react"
import axios from "axios"
import { useHistory, Link } from "react-router-dom"
import config from "../config"
const BASE_URL = config.BASE_URL

export default function CreateAccount() {

    const history = useHistory()
    const [registerError, setRegisterError] = useState(false)
    const [confirmPasswordFail, setConfirmPasswordFail] = useState(false)
    const [emailInUse, setEmailInUse] = useState(false)
    const [errorState, setErrorState] = useState({})
    const [formState, setFormState] = useState({
        'name': '',
        'email': '',
        'address': "",
        'password': '',
        'confirmPassword': '',
        'dob': '',
        'phone': ''

    })

    const updateFormField = (e) => {
        setFormState(
            {
                ...formState, [e.target.name]: e.target.value
            }
        )
    }

    function emailValidation(email) {
        let reg = /\S+@\S+\.\S+/;
        return reg.test(email);
    }

    const formValidation = () => {
        let formValid = true;
        let errorMessage = {};

        if (formState.name === "") {
            formValid = false
            errorMessage['nameError'] = "Please provide a valid name."
        }

        if (formState.email === "" || emailValidation(formState.email) === false) {
            formValid = false
            errorMessage['emailError'] = "Please provide a valid email."
        }

        if (formState.password === "" || formState.password.length < 8 || formState.password.length > 20) {
            formValid = false
            errorMessage['passwordError'] = "Please enter valid password."
        }

        if (formState.address === "" || formState.address.length > 255 || formState.address.length < 10) {
            formValid = false
            errorMessage['addressError'] = "Please provide your address."
        }

        if (formState.phone === "") {
            formValid = false
            errorMessage['phoneError'] = "Please provide a valid phone number."
        }

        if (formState.dob === "") {
            formValid = false
            errorMessage['dobError'] = "Please provide a valid DOB."
        }

        setErrorState(errorMessage)
        return formValid
    }

    const createAccount = async () => {

        let valid = formValidation()
        if (!valid) {
            return;
        }

        const response = await axios.post(BASE_URL + '/api/users/register', formState)
        if (response.data === "Unable to create user") {
            setRegisterError(true)
        } else if (response.data === "Passwords do not match") {
            setConfirmPasswordFail(true)
            setRegisterError(true)
        } else if (response.data === "Email already in use") {
            setEmailInUse(true)
            setRegisterError(true)
        } else {
            setRegisterError(false)
            history.push("/login?email=" + formState.email)
        }


    }

    return (
        <React.Fragment>
            <h1 className="mt-3 text-center"> CREATE NEW ACCOUNT </h1>
            <hr></hr>
            <div>
                <p className="email-in-use"
                    style={{ display: emailInUse === true ? "block" : "none" }}>
                    You have already created an account with this email, please login or use another email address
                </p>
            </div>
            <div className="row create-account-wrapper">
                <div className="form-holder">
                    <div className="form-content">
                        <div className="create-account-form col-lg-7 col-12">
                            <div className="form-label">Name: </div>
                            <input className="form-control"
                                name="name" type="text"
                                placeholder="Name"
                                value={formState.name}
                                onChange={updateFormField} />
                            <div className="form-error-text">
                                {errorState["nameError"]}
                            </div>
                        </div>
                        <div className="create-account-form col-lg-7 col-12">
                            <div className="form-label">Email: </div>
                            <input className="form-control"
                                name="email" type="text"
                                placeholder="Email"
                                value={formState.email}
                                onChange={updateFormField} />
                            <div className="form-error-text">
                                {errorState["emailError"]}
                            </div>
                        </div>
                        <div className="create-account-form col-lg-7 col-12">
                            <div className="form-label">Password: </div>
                            <input className="form-control"
                                aria-describedby="passwordHelpBlock"
                                name="password" type="password"
                                placeholder="Password"
                                value={formState.password}
                                onChange={updateFormField} />
                            <small id="passwordHelpBlock" class="form-text text-muted">
                                Your password must be 8-20 characters long.
                            </small>
                            <div className="form-error-text">
                                {errorState["passwordError"]}
                            </div>


                        </div>
                        <div className="create-account-form col-lg-7 col-12">
                            <div className="form-label">Confirm Password: </div>
                            <input className="form-control"
                                name="confirmPassword" type="password"
                                placeholder="Confirm Password"
                                value={formState.confirmPassword}
                                onChange={updateFormField} />
                            <p className="form-error-text"
                                style={{ display: confirmPasswordFail === true ? "block" : "none" }}>
                                Please make sure passwords match
                            </p>
                        </div>
                        <div className="create-account-form col-lg-7 col-12">
                            <div className="form-label">Phone: </div>
                            <input className="form-control"
                                name="phone" type="number"
                                placeholder="Phone"
                                value={formState.phone}
                                onChange={updateFormField} />
                            <div className="form-error-text">
                                {errorState["phoneError"]}
                            </div>
                        </div>
                        <div className="create-account-form col-lg-7 col-12">
                            <div className="form-label">Date Of Birth: </div>
                            <input className="form-control"
                                name="dob" type="date"
                                placeholder="Date of Birth"
                                value={formState.dob}
                                onChange={updateFormField} required />
                            <div className="form-error-text">
                                {errorState["dobError"]}
                            </div>
                        </div>
                        <div className="create-account-form col-12">
                            <div className="form-label">Address: </div>
                            <input className="form-control"
                                name="address" type="text"
                                placeholder="Address"
                                value={formState.address}
                                onChange={updateFormField} />
                            <div className="form-error-text">
                                {errorState["addressError"]}
                            </div>
                        </div>
                        <div className="mt-3">
                            <button className="btn allbtn" onClick={createAccount}>Create Account</button>

                            <Link className="btn allbtn mx-3" to="/products"> Cancel </Link>
                            <p className="form-error-text"
                                style={{ display: registerError === true ? "block" : "none" }}>
                                Register Error, Please check error messages and try again.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}