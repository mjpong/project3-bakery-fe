import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React from 'react';
import Landing from "./components/Landing";
import ProductListing from "./components/ProductListing";
import IndividualProduct from "./components/IndividualProduct";
import ShoppingCart from "./components/ShoppingCart";
import Login from "./components/Login";
import LoginContext from "./components/LoginContext";
import CreateAccount from './components/CreateAccount';
import axios from "axios";

import config from "./config"
const BASE_URL = config.BASE_URL

function App() {
    return (
        <Router>
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="#">Roll With Me</a>
                <div className="navbar" >
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Create Account</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/shoppingcart">Shopping Cart</Link>
                        </li>
                    </ul>
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
                <Route exact path ='/login'>
                    <Login />
                </Route>
                <Route exact path ='/register'>
                    <CreateAccount />
                </Route>
                <Route exact path="/shoppingcart">
                    <ShoppingCart />
                </Route>
            </Switch>
        </Router>
    )

}

export default App;