import React from 'react'
import "../Styles/Welcome.scss"
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom"

function Welcome() {
    return (
        <div className="welcome">
            <div className="welcome_banner">
                <img src={require("../Media/welcome.png")} />
            </div>
            <div className="welcome_buttons">
                <strong>Table Tennis Pros</strong>
                <Button className="welcome_button" variant="primary" as={Link} to="/login">Login</Button>
                <Button className="welcome_button welcome-signup-button" variant="outline-primary" as={Link} to="/signup">SignUp</Button>
            </div>
        </div>
    )
}

export default Welcome
