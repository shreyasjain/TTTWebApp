import React from 'react'
import { Button } from 'react-bootstrap'
import FooterButtons from './FooterButtons'

function NoTournaments() {
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

export default NoTournaments
