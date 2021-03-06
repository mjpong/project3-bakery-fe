import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";

import Landing from "./components/Landing";
import ProductListing from "./components/ProductListing";
import IndividualProduct from "./components/IndividualProduct";
import CareGuide from "./components/CareGuide";
import ShoppingCart from "./components/ShoppingCart";
import Login from "./components/Login";
import LoginContext from "./components/LoginContext";
import UserProfile from "./components/UserProfile";
import EditUserProfile from "./components/EditUserProfile";
import CreateAccount from './components/CreateAccount';
import Order from "./components/Order";
import IndividualOrder from "./components/IndividualOrder";
import CreateOrder from "./components/CreateOrder";

import config from "./config"
const BASE_URL = config.BASE_URL

function App() {

    const [loggedIn, setLoggedIn] = useState(false)
    const [userId, setUserId] = useState(0)


    useEffect(() => {
        setInterval(async () => {
            let refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
                const response = await axios.post(BASE_URL + "/api/users/refresh", {
                    refreshToken
                })
                localStorage.setItem('accessToken', response.data.accessToken)
            }
        }, config.REFRESH_INTERVAL)
    }, [])


    //see if there is a token in local storage
    const localToken = localStorage.getItem('accessToken')
    if (localToken) {
        const checkToken = async () => {

            const response = await axios.get(BASE_URL + "/api/users/profile", {
                headers: {
                    authorization: "Bearer " + localToken
                }
            })
            setUserId(response.data.id)
            // see if the id and returning access token is the same
            if (userId === parseInt(localStorage.getItem('id'))) {
                setLoggedIn(true)
            }
        }
        checkToken()
    }

    const context = {
        checkLogin: () => {
            return loggedIn
        },
        changeUser: (id) => {
            setUserId(id)
        },
        changeLogin: () => {
            if (loggedIn === false) {
                setLoggedIn(true)
            } else {
                setLoggedIn(false)
            }
        }
    }

    const logoutUser = async () => {
        const response = await axios.post(BASE_URL + "/api/users/logout", {
            "refreshToken": localStorage.getItem("refreshToken")
        })
        if (response.data) {
            localStorage.clear()
            setLoggedIn(false)
        }
    }


    return (
        <React.Fragment>
            <Router>
                <div className='container-fluid'>
                    <div className="logo-wrapper row">
                        <Link className="logo-image p-2" to="/">
                            <img src={require("./images/RollWithMe.png").default} height="150px" width="150px" alt="logo" />
                        </Link>
                    </div>
                    <div className="row">
                        <nav className="navbar sticky-top navbar-expand-md">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"><i class="fas fa-bars"></i></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/products">Cinnamon Rolls</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/careguide">Care Guide</Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <button className="nav-link dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                            My Account
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li className="nav-item">
                                                <Link className="dropdown-item"
                                                    style={{ display: loggedIn === false ? "block" : "none" }}
                                                    to="/register">Create Account</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="dropdown-item"
                                                    style={{ display: loggedIn === false ? "block" : "none" }}
                                                    to="/login">Login</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="dropdown-item"
                                                    style={{ display: loggedIn === true ? "block" : "none" }}
                                                    to="/profile">Profile Page</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="dropdown-item"
                                                    style={{ display: loggedIn === true ? "block" : "none" }}
                                                    to="/shoppingcart">Shopping Cart</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="dropdown-item"
                                                    style={{ display: loggedIn === true ? "block" : "none" }}
                                                    to="/orders">My Orders</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="dropdown-item"
                                                    style={{ display: loggedIn === true ? "block" : "none" }}
                                                    onClick={logoutUser}
                                                    to="/">Logout</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="content-container">
                    <Switch>
                        <Route exact path="/">
                            <Landing />
                        </Route>
                        <Route exact path="/products">
                            <ProductListing />
                        </Route>
                        <Route exact path="/products/:product_id">
                            <IndividualProduct />
                        </Route>
                        <Route exact path="/careguide">
                            <CareGuide />
                        </Route>
                        <Route exact path='/login'>
                            <LoginContext.Provider value={context}>
                                <Login />
                            </LoginContext.Provider>
                        </Route>
                        <Route exact path='/register'>
                            <LoginContext.Provider value={context}>
                                <CreateAccount />
                            </LoginContext.Provider>
                        </Route>
                        <Route exact path='/profile'>
                            <UserProfile />
                        </Route>
                        <Route exact path='/profile/edit'>
                            <EditUserProfile />
                        </Route>

                        <Route exact path="/shoppingcart">
                            <ShoppingCart />
                        </Route>
                        <Route exact path="/orders">
                            <Order />
                        </Route>
                        <Route exact path="/orders/:order_id">
                            <IndividualOrder />
                        </Route>
                        <Route exact path="/checkout">
                            <CreateOrder />
                        </Route>

                    </Switch>
                </div>

                <div className="footer container-fluid p-3 mt-3">
                    <div className="row">
                        <section className="leftcol col-6">
                            <p className="footer-header">Quick Links</p>
                            <li style={{ display: loggedIn === false ? "block" : "block" }}>
                                <Link className="footer-link" to="/products">Cinnamon Rolls</Link>
                            </li>
                            <li style={{ display: loggedIn === false ? "block" : "block" }}>
                                <Link className="footer-link" to="/careguide">Care Guide</Link>
                            </li>
                            <li style={{ display: loggedIn === false ? "block" : "none" }}>
                                <Link className="footer-link" to="/login">Login</Link>
                            </li>
                            <li style={{ display: loggedIn === false ? "block" : "none" }}>
                                <Link className="footer-link" to="/profile">Profile Page</Link>
                            </li>
                            <li style={{ display: loggedIn === true ? "block" : "none" }}>
                                <Link className="footer-link" to="/shoppingcart">Shopping Cart</Link>
                            </li>
                            <li style={{ display: loggedIn === true ? "block" : "none" }}>
                                <Link className="footer-link" to="/orders">My Orders</Link>
                            </li>
                            <li style={{ display: loggedIn === true ? "block" : "none" }}>
                                <Link className="footer-link" onClick={logoutUser}
                                    to="/">Logout</Link>
                            </li>
                        </section>

                        <section className="rightcol col-6">
                            <p className="footer-header">Contact Us</p>
                            <p className="footer-text"><i class="fas fa-phone"></i> + 852 9888 1234 </p>
                            <p className="footer-text"><i class="fas fa-phone"></i> + 65 9888 1234 </p>
                            <p className="footer-text"><i class="far fa-envelope"></i><a className="footer-link" href="mailto:letsroll@rollwithme.com"> Email Us </a></p>
                            <p className="footer-text"><i class="fab fa-instagram"></i><a className="footer-link" href="https://www.instagram.com/explore/tags/rollwithme/"> #rollwithme </a></p>
                        </section>
                    </div>
                </div>
            </Router>
        </React.Fragment >
    )
}

export default App;