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


                <div className="about-us row p-3 mt-3">
                    <h2 className="text-center">ABOUT US</h2>
                    <div className="row">
                        <div className="col-sm-6 col-12 p-3 about-us-text">
                            <p>We make phenomenal cinnamon rolls!
                                Roll With Me is a small independent bakery based in Singapore, known for its super fab and tasty cinnamon rolls.
                                We make everything in-house from scratch daily with only the finest ingredients, bringing the best rolls to you.</p>
                        </div>
                        <div className="col-sm-6 col-12 about-us-image p-3">
                            <img src={require("../images/c1.jpg").default} width="100%" height="100%" alt="about-us" />
                        </div>

                    </div>
                </div>
                <div className="weekly-product">
                    <h2 className="pt-3 text-center">FEATURED PRODUCT OF THE WEEK</h2>
                    <div className="landing-product-wrapper p-3 ">
                        <Link to={"/products/4"} className="product-link row">
                            <div className="col-sm-6 col-12 feature-img">
                                <img src={this.state.image} width="200px" alt="img" />
                            </div>
                            <div className="feature-name col-sm-6 col-12">
                                <div>
                                    <h4>{this.state.name}</h4>
                                    <p>${this.state.cost / 100}</p>
                                    <p>{this.state.description}</p>
                                </div>
                            </div>
                        </Link>

                    </div>
                </div>

            </React.Fragment>

        )
    }
}