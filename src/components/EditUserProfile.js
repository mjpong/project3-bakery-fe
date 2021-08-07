import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import config from "../config";
const BASE_URL = config.BASE_URL;


export default function EditUserProfile() {

    const history = useHistory();
    const [loaded, setLoaded] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [updateProfileError, setUpdateProfileError] = useState(false)
    const [confirmPasswordFail, setConfirmPasswordFail] = useState(false)
    const [errorState, setErrorState] = useState({})
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

    function emailValidation(email) {
        let reg = /\S+@\S+\.\S+/;
        return reg.test(email);
    }

    const formValidation = () => {
        let formValid = true;
        let errorMessage = {};

        if (name === "") {
            formValid = false
            errorMessage['nameError'] = "Please provide a valid name."
        }

        if (email === "" || emailValidation(email) === false) {
            formValid = false
            errorMessage['emailError'] = "Please provide a valid email."
        }

        if (password === "" || password.length < 8 || password.length > 20) {
            formValid = false
            errorMessage['passwordError'] = "Please enter valid password."
        }

        if (address === "" || address.length > 255 || address.length < 10) {
            formValid = false
            errorMessage['addressError'] = "Please provide your address."
        }

        if (phone === "") {
            formValid = false
            errorMessage['phoneError'] = "Please provide a valid phone number."
        }

        if (dob === "") {
            formValid = false
            errorMessage['dobError'] = "Please provide a valid DOB."
        }

        setErrorState(errorMessage)
        return formValid
    }


    const updateProfile = async () => {

        let valid = formValidation()
        if (!valid) {
            return;
        }

        const response = await axios.post(BASE_URL + "/api/users/update", {
            "name": name,
            "email": email,
            "address": address,
            "password": password,
            "phone": phone,
            "dob": dob
        }, {
            headers: {
                authorization: "Bearer " + localStorage.getItem('accessToken')
            }
        })
        if (response.data == "Update profile error") {
            setUpdateProfileError(true)
        } else if (response.data == "Passwords do not match") {
            setConfirmPasswordFail(true)
            setUpdateProfileError(true)
        } else {
            setUpdateProfileError(false)
            history.push("/login?email=" + email)
        }
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
                <div className="row create-account-wrapper">
                    <div className="form-holder">
                        <div className="form-content">
                            <div className="create-account-form col-lg-7 col-12">
                                <div className="form-label">Name: </div>
                                <input className="form-control"
                                    name="name" type="text"
                                    placeholder="Name"
                                    value={name} onChange={(e) => setName(e.target.value)} />
                                <div className="form-error-text">
                                    {errorState["nameError"]}
                                </div>
                            </div>
                            <div className="create-account-form col-lg-7 col-12">
                                <div className="form-label">Email: </div>
                                <input className="form-control"
                                    name="email" type="text"
                                    placeholder="Email"
                                    value={email} onChange={(e) => setEmail(e.target.value)} />
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
                                    value={password} onChange={(e) => setPassword(e.target.value)} />
                                <small id="passwordHelpBlock" class="form-text text-muted">
                                    Your password must be 8-20 characters long.
                                </small>
                                <div className="form-error-text">
                                    {errorState["passwordError"]}
                                </div>
                                <div className="create-account-form col-lg-7 col-12">
                                    <div className="form-label">Confirm Password: </div>
                                    <input className="form-control"
                                        name="confirmPassword" type="password"
                                        placeholder="Confirm Password"
                                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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
                                        value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    <div className="form-error-text">
                                        {errorState["phoneError"]}
                                    </div>
                                </div>
                                <div className="create-account-form col-lg-7 col-12">
                                    <div className="form-label">Date Of Birth: </div>
                                    <input className="form-control"
                                        name="dob" type="date"
                                        placeholder="Date of Birth"
                                        value={dob} onChange={(e) => setDob(e.target.value)} />
                                    <div className="form-error-text">
                                        {errorState["dobError"]}
                                    </div>
                                </div>
                                <div className="create-account-form col-12">
                                    <div className="form-label">Address: </div>
                                    <input className="form-control"
                                        name="address" type="text"
                                        placeholder="Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)} />
                                    <div className="form-error-text">
                                        {errorState["addressError"]}
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <button className="btn allbtn" onClick={updateProfile}>Update Profile</button>
                                    <Link className="btn allbtn mx-3" to="/profile"> Cancel </Link>
                                    <p className="form-error-text"
                                        style={{ display: updateProfileError === true ? "block" : "none" }}>
                                        Update Error, Please check error messages and try again.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment >
        )
    }
}