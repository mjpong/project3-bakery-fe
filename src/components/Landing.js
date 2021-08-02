import React from 'react'
import { Link } from "react-router-dom"
export default function Landing() {
    return (
        <React.Fragment>
            <div className="hero-image">
                <div className="hero-wrapper">
                    <Link className="hero-button" to="/products">
                        <h1>Let's Roll</h1>
                    </Link>

                </div>
            </div>
        </React.Fragment>
    )
}