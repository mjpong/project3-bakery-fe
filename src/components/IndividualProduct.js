import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import config from "../config";
const BASE_URL = config.BASE_URL;

export default function IndividualProduct() {

    let { product_id } = useParams();
    const history = useHistory();
    const [loaded, setLoaded] = useState(false);
    const [added, setAdded] = useState(false);
    const [name, setName] = useState("");
    const [cost, setCost] = useState(0);
    const [description, setDescription] = useState("");
    const [doughtype, setDoughtype] = useState({
        "ingredients": []
    });
    const [flavor, setFlavor] = useState('')
    const [toppings, setToppings] = useState([]);
    const [image, setImage] = useState("")

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(BASE_URL + "/api/products/" + product_id)
            setName(response.data.name)
            setCost(response.data.cost)
            setDescription(response.data.description)
            setDoughtype(response.data.dough_type)
            setFlavor(response.data.flavor)
            setToppings(response.data.toppings)
            setImage(response.data.image)
            setLoaded(true)
        }
        fetch();
    }, [product_id])

    const addToCart = async (product_id) => {
        if (localStorage.getItem("id") == null) {
            history.push("/login")
        } else if (localStorage.getItem("id") !== null) {
            await axios.post(BASE_URL + "/api/shoppingcart/add/" + product_id, "", {
                headers: {
                    authorization: "Bearer " + localStorage.getItem('accessToken')
                }
            })
            setAdded(true)
            setLoaded(true)
        }
    }

    if (loaded === false) {
        return (
            <img className="loading" src="https://scarto.cachefly.net/labaking.com/img/hloading-alt.gif" alt="loading" />
        )
    } else {
        return (
            <React.Fragment>
                <div className='row p-5'>
                    <div className="single-product-image col-12 col-lg-5 ">
                        <img src={image} height="350px" alt="single-product" />
                    </div>
                    <div className="col-12 col-lg-7">
                        <h1 className="product-name mt-3">{name}</h1>
                        <hr></hr>
                        <p>{description}</p>
                        <p style={{ fontStyle: 'italic' }}>Price per roll: ${cost / 100}</p>
                        <div className="row description-wrapper">
                            <div className="col-12 col-xl-6 col-md-6">
                                <h4 className="table-details">Roll Details</h4>
                                <table className="table">
                                    <tbody>
                                        <tr className="table-details">
                                            <td>
                                                <strong>Flavor</strong>
                                            </td>
                                            <td>
                                                {flavor.name} Roll
                                            </td>
                                        </tr>
                                        <tr className="table-details">
                                            <td>
                                                <strong>Dough Type</strong>
                                            </td>
                                            <td>
                                                {doughtype.name}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-12 col-xl-6 col-md-6">
                                <h4>Ingredients</h4>
                                <table className="table">
                                    <tbody>
                                        <tr className="table-details">
                                            <td>
                                                <strong>Toppings</strong>
                                            </td>
                                            <td>
                                                {toppings.map(p => p.name).join(", ")}
                                            </td>
                                        </tr>
                                        <tr className="table-details">
                                            <td>
                                                <strong>Ingredients</strong>
                                            </td>
                                            <td>
                                                {doughtype.ingredients.map(p => p.name).join(", ")}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="addtocart-wrapper">
                            <button className="btn allbtn" onClick={() => addToCart(product_id)}>Add to Cart</button>
                            <p className="item-added"
                                style={{ display: added === true ? "block" : "none" }}>
                                Item has been added to your shopping cart</p>
                            <div className="item-added-btn" style={{ display: added === true ? "block" : "none" }}>
                                <Link className="btn allbtn" to="/products"> Continue Browsing </Link>
                                <br></br>
                                <Link className="btn allbtn mt-2" to="/shoppingcart"> Checkout </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row p-3">
                    <div className="reheat-instructions">
                        <h4>Reheating Instructions: </h4>
                        <p>Oven: <br></br>
                            Preheat your oven to 350°F. Place your cinnamon rolls in a baking dish and cover with foil. <br></br>
                            Heat the cinnamon rolls for 10 minutes or until they are warm and the frosting has softened.
                        </p>
                        <p>Microwave: <br></br>
                            Place your cinnamon rolls on a microwave-safe dish. <br></br>
                            Heat for 30 seconds. Check the cinnamon rolls and repeat until they’re thoroughly heated.</p>
                    </div>
                </div>

            </React.Fragment>
        )
    }

}