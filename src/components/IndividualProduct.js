import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import config from "../config"
const BASE_URL = config.BASE_URL

export default function IndividualProduct() {

    let { product_id } = useParams();
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [added, setAdded] = useState(false);
    const [name, setName] = useState("");
    const [cost, setCost] = useState(0);
    const [description, setDescription] = useState("");
    const [doughtype, setDoughtype] = useState('');
    const [flavor, setFlavor] = useState('')
    const [topping, setTopping] = useState([]);
    const [image, setImage] = useState("")


    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(BASE_URL + "/api/products/" + product_id)
            setLoaded(true)
            setName(response.data.name)
            setCost(response.data.cost)
            setDescription(response.data.description)
            setDoughtype(response.data.dough_type)
            setFlavor(response.data.flavor)
            setTopping(response.data.toppings)
            setImage(response.data.image)
            console.log(response.data)
        }
        fetch();
    }, [])

    const addToCart = async (product_id) => {
        if (localStorage.getItem("id") == null) {
            setLoggedIn(false)
            history.push("/login")
        } else if (localStorage.getItem("id") !== null) {
            setLoggedIn(true)
            await axios.post(BASE_URL + "/api/shoppingcart/add/" + product_id, "", {
                headers: {
                    authorization: "Bearer " + localStorage.getItem('accessToken')
                }
            }
            )
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
                <h2>Our Cinnamon Rolls:</h2>

                <img className="single-product-image" src={image} width="200px" alt="img" />
                <h4>{name}</h4>
                <p>Description: {description}</p>
                <p>Cost: ${cost / 100}</p>
                <button className="btn btn-primary" onClick={() => addToCart(product_id)}>Add to Cart</button>
                <p className="item-added"
                    style={{ display: added === true ? "block" : "none" }}>
                    Item has been added to your shopping cart</p>
            </React.Fragment>
        )
    }

}