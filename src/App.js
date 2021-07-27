import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";

import Landing from "./components/Landing";
import ProductListing from "./components/ProductListing";
import IndividualProduct from "./components/IndividualProduct";
import ShoppingCart from "./components/ShoppingCart";
import Login from "./components/Login";
import LoginContext from "./components/LoginContext";
import CreateAccount from './components/CreateAccount';
import Order from "./components/Order";
import CreateOrder from "./components/CreateOrder"

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
            // see if it's still valid
            console.log(localToken);
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
                <nav className="navbar">
                    <div className="logo row">
                        <Link className="navbar-brand" style={{ display: "flex", width: "150px", height: "150px" }} to="/">
                            <img src={require("./RollWithMe.png").default} alt="logo" />
                        </Link>
                    </div>
                    <div className="row">
                        <Link className="nav-link" to="/products">Cinnamon Rolls</Link>
                    
                        <Link className="nav-link"
                            style={{ display: loggedIn === false ? "block" : "none" }}
                            to="/register">Create Account</Link>
                        <Link className="nav-link"
                            style={{ display: loggedIn === false ? "block" : "none" }}
                            to="/login">Login</Link>
                        <Link className="nav-link"
                            style={{ display: loggedIn === true ? "block" : "none" }}
                            onClick={logoutUser}
                            to="/">Logout</Link>
                        <Link className="nav-link"
                            style={{ display: loggedIn === true ? "block" : "none" }}
                            to="/shoppingcart">Shopping Cart</Link>
                        <Link className="nav-link"
                            style={{ display: loggedIn === true ? "block" : "none" }}
                            to="/order">My Orders</Link>

                    </div>
                </nav>


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
                    <Route exact path="/shoppingcart">
                        <ShoppingCart />
                    </Route>
                    <Route exact path="/order">
                        <Order />
                    </Route>
                    <Route exact path="/checkout">
                        <CreateOrder />
                    </Route>
                </Switch>

                {/* <hr></hr>
                <div className="footer row">
                    <section className="footer-left col-4">
                        <p className="left-header">Quick Links</p>
                        <ul className="link-list">
                            <li className="footer-link">
                                <Link to="/products">Cinnamon Rolls</Link>
                            </li>
                        </ul>
                    </section>
                    <section className="footer-center col-4">
                        <Link className="footer-logo" style={{ display: "flex", width: "150px", height: "150px" }} to="/">
                            <img src={require("./RollWithMe.png").default} alt="logo" />
                        </Link>
                    </section>
                    <section className="footer-right col-4">
                        <p className="right-header">Contact Us</p>
                        <ul className="link-list">
                            <li>
                                Phone
                            </li>
                            <li>
                                Email
                            </li>
                            <li>
                                Whatsapp
                            </li>
                        </ul>
                    </section>
                </div>

 */}

            </Router>

        </React.Fragment>
    )
}

export default App;