import React from 'react'
import "../Styles/footerButtons.scss"
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SportsHandballIcon from '@material-ui/icons/SportsHandball';
import {useHistory} from "react-router-dom"

function FooterButtons() {

    const history = useHistory()

    const tournamentClicked = (e =>{
        e.preventDefault()
        history.push("/tournaments")
    })

    const myProfileClicked = (e =>{
        e.preventDefault()
        history.push("/myProfile")
    })

    return (
        <div className="footer_buttons">
            {/* <div className="footer_button">
                    <button><HelpOutlineIcon /></button>
                </div> */}
                <div className="footer_button">
                    <button onClick={e => tournamentClicked(e)}><SportsHandballIcon /></button>
                    <span>Tournments</span>
                </div>
                <div className="footer_button">
                    <button onClick={e => myProfileClicked(e)}><PersonOutlineIcon /></button>
                </div>
        </div>
    )
}

export default FooterButtons
