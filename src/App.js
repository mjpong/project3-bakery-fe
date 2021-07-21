import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React from 'react';
import Landing from "./components/Landing";
import ProductListing from "./components/ProductListing";
import IndividualProduct from "./components/IndividualProduct"
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
                        <li className="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div>
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
            </Switch>
        </Router>
    )

}

export default App;