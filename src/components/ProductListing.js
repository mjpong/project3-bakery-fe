import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import config from "../config"
const BASE_URL = config.BASE_URL

export default function ProductListing() {

    const [loaded, setLoaded] = useState(false)
    const [products, setProducts] = useState({})
    const [flavors, setFlavors] = useState([])
    const [doughtype, setDoughType] = useState([])
    const [searchName, setSearchName] = useState("")
    const [searchFlavor, setSearchFlavor] = useState("")
    const [searchDoughType, setSearchDoughType] = useState("")


    useEffect(() => {
        const fetch = async () => {
            const productsResponse = await axios.get(BASE_URL + "/api/products")
            const flavorsResponse = await axios.get(BASE_URL + "/api/products/flavors")
            const doughResponse = await axios.get(BASE_URL + "/api/products/doughtypes")
            setProducts(productsResponse.data)
            setFlavors(flavorsResponse.data)
            setDoughType(doughResponse.data)
            console.log(doughResponse.data)
            setLoaded(true)

        }
        fetch()
    }, [])

    const searchQuery = async () => {
        let searchLoad = {}
        if (searchName !== "") {
            searchLoad.name = searchName
        }

        if (searchFlavor !== "- Flavor Type -" && searchFlavor !== "") {
            searchLoad.flavor_id = searchFlavor
        }

        if (searchDoughType !== "- Dough Type -" && searchDoughType !== "") {
            searchLoad.dough_type_id = searchDoughType
        }
        const response = await axios.post(BASE_URL + "/api/products/search", searchLoad)
        setProducts(response.data)
    }


    const resetQuery = async () => {
        const response = await axios.get(BASE_URL + "/api/products")
        setProducts(response.data)
        setSearchName("")
        setSearchFlavor("")
        setSearchDoughType("")
    }

    function renderFlavor() {
        let options = [];
        for (let f of flavors) {
            console.log(f);
            let e = (
                <option value={f[0]}>{f[1]}</option>
            )
            options.push(e)
        }
        return options;
    }

    function renderDoughType() {
        let options = [];
        for (let d of doughtype) {
            let e = (
                <option value={d[0]}>{d[1]}</option>
            )
            options.push(e)
        }
        return options;
    }


    if (loaded === false) {
        return (
            <p>Products Loadings</p>
        )
    } else {
        return (
            <React.Fragment>
                <h1> Product Page </h1>
                <div className="row">
                    <div className="filter-header col-3">
                        <p>Filter</p>
                        <input type="text" className="filter-input"
                            name="searchName"
                            placeholder="Search By Product Name"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}></input>
                        <select name="searchFlavor" value={searchFlavor}
                            className="filter-input"
                            onChange={(e) => setSearchFlavor(e.target.value)}>
                            <option defaultValue>- Flavor Type -</option>
                            {renderFlavor()}
                        </select>
                        <select name="searchDoughType" value={searchDoughType}
                            className="filter-input"
                            onChange={(e) => setSearchDoughType(e.target.value)}>
                            <option defaultValue>- Dough Type -</option>
                            {renderDoughType()}
                        </select>
                        <div className="filter-buttons">
                            <button type="submit" className="btn btn-secondary search my-1 mx-sm-2 " onClick={searchQuery}><i class="fas fa-search"></i></button>
                            <button type="submit" className="btn btn-secondary search-reset my-1 mx-sm-2 " onClick={resetQuery}><i class="fas fa-undo-alt"></i></button>
                        </div>
                    </div>
                    <div className="col-9">
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
                    </div>
                </div>
            </React.Fragment >
        )
    }
}