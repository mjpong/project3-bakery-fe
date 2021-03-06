import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import config from "../config";
const BASE_URL = config.BASE_URL;

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

    function renderProducts() {
        return products.map(p => {
            if (p.stock >= 1) {
                return <div className="col-lg-4 col-md-12 col-12 product-wrapper p-2" key={p.id}>
                    <Link to={"/products/" + p.id} className="product-link">
                        <img className="product-image" key={p.id} src={p.image} width="300px" height="300px" alt="img" />
                        <div className="product-name mt-2">
                            <h4>{p.name}</h4>
                            <p>${p.cost / 100}</p>
                        </div>
                    </Link>
                </div>
            }
            return <div></div>;
        })
    }

    if (loaded === false) {
        return (
            <img className="loading" src="https://scarto.cachefly.net/labaking.com/img/hloading-alt.gif" alt="loading" />
        )
    } else {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row mt-3">
                        <div className="filter-wrapper col-lg-3 col-md-3 col-sm-12">
                            <div className="filter-title">
                                <h5>Filter & Search</h5>
                            </div>
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
                                <button type="submit" className="btn icon-buttons my-1 mx-sm-2 " onClick={searchQuery}><i class="fas fa-search"></i></button>
                                <button type="submit" className="btn icon-buttons my-1 mx-sm-2 " onClick={resetQuery}><i class="fas fa-undo-alt"></i></button>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-12">
                            <h1 className="text-center mt-3"> OUR ROLLS </h1>
                            <div className="header-image-wrapper my-3">
                            </div>
                            <p style={{ fontStyle: 'italic' }}> Showing {products.length} rolls... </p>
                            <div className="row">
                                {renderProducts()}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}