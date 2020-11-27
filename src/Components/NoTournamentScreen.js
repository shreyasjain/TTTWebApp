import React from 'react'
import { Button } from 'react-bootstrap'
import FooterButtons from './FooterButtons'

function NoTournamentScreen() {
    return (
        <div className="tournament">
            <div className="tournament_content">
                <p>Create your first tournament.</p>
                <Button>Create Now</Button>
            </div>
        </div>
    )
}

export default NoTournamentScreen
