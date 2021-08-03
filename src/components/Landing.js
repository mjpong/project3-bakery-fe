import axios from 'axios'
import React from 'react'
import { Link } from "react-router-dom"
import config from "../config"
const BASE_URL = config.BASE_URL


export default class Landing extends React.Component {

    state = {
        'name': "",
        'cost': 0,
        'description': '',
        'image': ""
    }

    async componentDidMount() {
        this.getProduct()
    }

    getProduct = async () => {
        let response = await axios.get(BASE_URL + "/api/products/4")
        console.log(response.data)

        this.setState({
            'name': response.data.name,
            'cost': response.data.cost,
            'description': response.data.description,
            'image': response.data.image
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="hero-image">
                    <div className="hero-wrapper">
                        <Link className="hero-button" to="/products">
                            <h1 className="hero-text">Let's Roll</h1>
                        </Link>
                    </div>
                </div>
                <div className="about-us container-fluid mt-3 row">
                    <div className="col-6">
                        <h2>About Us</h2>
                        <p>We make phenomenal cinnamon rolls!
                            Roll With Me is a small independent bakery based in Singapore, known for its super fab and tasty cinnamon rolls.
                            We make everything in-house from scratch daily with only the finest ingredients, bringing the best rolls to you.</p>
                    </div>
                    <div className="col-6">
                        <img src={require("../images/c1.jpg").default} width="200px" height="100%" alt="logo" />
                    </div>
                </div>
                <div className="weekly-product container-fluid">
                    <h2>Featured Product of the Week</h2>
                    <div className="">
                        <Link to={"/products/4"} className="product-link">
                            <img className="product-image" src={this.state.image} width="200px" alt="img" />
                            <div className="product-name mt-2">
                                <h4>{this.state.name}</h4>
                                <p>${this.state.cost / 100}</p>
                            </div>
                        </Link>

                    </div>
                </div>

            </React.Fragment>

        )
    }
}