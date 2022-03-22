import React from "react"
import { config } from "./site_config"


import 'bootstrap/dist/css/bootstrap.css'
//import { Collapse } from "bootstrap"


class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light scrolling-navbar">
                <div className="container">
                    <Brand />
                    <Collapse />
                    <Links />
                </div>
            </nav>
        )
    }
}

function Brand(props) {
    const style = {
        width: "30px",
        height: "auto",
    };
    return (
        <a className="navbar-brand" href={config.siteBaseUrl}>
            <img 
                className="avatar d-inline-block align-top" 
                alt="" 
                style={style}
                // Here needs to use the static path string. 
                src={require("../assets/avatar.png")} 
            />
            <strong>{config.authorName}</strong>
        </a>
    )
}

function Collapse(props) {
    return (
        <button 
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
    )
}

function Links(props) {
    return (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                {config.routers.map((rtrs) => (
                    <li className="nav-item" key={rtrs.name}>
                        <a className="nav-link" href={rtrs.url}>
                            {rtrs.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>

    )
}

export default Navbar;