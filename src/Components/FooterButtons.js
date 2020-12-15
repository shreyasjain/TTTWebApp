import React from 'react'
import "../Styles/footerButtons.scss"
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SportsTennisIcon from '@material-ui/icons/SportsTennis';
import SportsHandballIcon from '@material-ui/icons/SportsHandball';
import { useHistory } from "react-router-dom"
import { Nav } from "react-bootstrap"

function FooterButtons() {
    
    const history = useHistory()

    const tournamentClicked = (e => {
        e.preventDefault()
        history.push("/tournaments")
    })

    const myProfileClicked = (e => {
        e.preventDefault()
        history.push("/myProfile")
    })

    const playersClicked = (e => {
        e.preventDefault()
        history.push("/players")
    })

    return (
        <div className="footer_buttons">
            <Nav variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link eventKey="link-1" id="footer-tournament-btn" onClick={e => tournamentClicked(e)}><SportsTennisIcon />
                    <p  >Tournments</p></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" id="footer-players-btn" onClick={e => playersClicked(e)}><SportsHandballIcon /><p>Players</p></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3" id="footer-profile-btn" onClick={e => myProfileClicked(e)}><PersonOutlineIcon /><p>Profile</p></Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}

export default FooterButtons
