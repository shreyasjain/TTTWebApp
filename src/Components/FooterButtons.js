import React from 'react'
import "../Styles/footerButtons.scss"
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SportsHandballIcon from '@material-ui/icons/SportsHandball';

function FooterButtons() {
    return (
        <div className="footer_buttons">
            <div className="footer_button">
                    <button><HelpOutlineIcon /></button>
                </div>
                <div className="footer_button">
                    <button><SportsHandballIcon /></button>
                </div>
                <div className="footer_button">
                    <button><PersonOutlineIcon /></button>
                </div>
        </div>
    )
}

export default FooterButtons
