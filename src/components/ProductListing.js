import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import config from "../config"
const BASE_URL = config.BASE_URL

export default function ProductListing() {

    const [loaded, setLoaded] = useState(false)
    const [products, setProducts] = useState({})
    

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(BASE_URL + "/api/products")
            setProducts(response.data)
            setLoaded(true)
        }
        fetch()
    }, [])


    if (loaded === false) {
        return (
            <p>Products Loadings</p>
        )
    } else {
        return (
            <React.Fragment>
                <h1> Product Page </h1>
                <p> Showing {products.length} items</p>
                <div className="row">
                    {products.map(p =>
                        <div className="col-12 key={p.id}">
                            <div className="single-product">
                                <div>
                                    <Link to={'/products/' + p.id} className='product-link'>Item Name: {p.name}</Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </React.Fragment>
        )
    }
}