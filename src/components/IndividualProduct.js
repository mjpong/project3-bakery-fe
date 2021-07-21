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
    const [name, setName] = useState("");
    const [cost, setCost] = useState(0);
    const [description, setDescription] = useState("");
    const [doughtype, setDoughtype] = useState('');
    const [flavor, setFlavor] = useState('')
    const [topping, setTopping] = useState([]);
    const [image, setImage]= useState("")


    useEffect(()=> {
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
        }
        fetch();
    }, [])


    if (loaded === false) {
        return (
            <p>Loading</p>
        )
    } else {
        return (
            <React.Fragment>
        
                <h1>Cinnamon Roll: {name}</h1>
                <p>Description: {description}</p>
            </React.Fragment>
        )
    }

}