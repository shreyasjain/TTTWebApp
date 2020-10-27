import React from 'react'
import "../Styles/Players_Home.scss"
import { Button } from 'react-bootstrap'
import FooterButtons from './FooterButtons'

function Players_Home() {
    return (
        <div className="players">
            <div className="players_heading">
                <strong>Players</strong>
            </div>
            <div className="players_content">
                <p>Create your first player.</p>
                <Button>Create</Button>
            </div>
            <FooterButtons />
        </div>
    )
}

export default Players_Home
