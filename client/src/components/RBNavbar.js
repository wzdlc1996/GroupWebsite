import React from "react"
import { Container, Nav, Navbar } from "react-bootstrap"

import { config } from "./site_config"


function RBNavbar(props) {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href={config.siteBaseUrl}>
                    <img 
                        className="d-inline-block align-top" 
                        alt=""
                        width="30"
                        height="30"
                        // Here needs to use the static path string. 
                        src={require("../assets/avatar.png")} 
                    />
                    <strong>{config.authorName}</strong>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {
                            config.routers.map((val) => {
                                let iscurr = window.location.href.includes(val.url);
                                if(iscurr) {
                                    return <Nav.Link href={val.url} className="active" key={val.name}>{val.name}</Nav.Link>
                                } else {
                                    return <Nav.Link href={val.url} key={val.name}>{val.name}</Nav.Link>
                                }
                            })
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default RBNavbar;