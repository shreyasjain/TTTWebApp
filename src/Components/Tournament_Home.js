import React from 'react'
import "../Styles/Tournament_Home.scss"
import FooterButtons from './FooterButtons'
import { Button } from 'react-bootstrap'

function Tournament_Home() {
    return (
        <div className="tournament">
            <div className="tournament_heading">
                <strong>Tournaments</strong>
            </div>
            <div className="tournament_content">
                <p>Create your first tournament.</p>
                <Button>Create</Button>
            </div>
            <FooterButtons />
        </div>
    )
}

export default Tournament_Home
