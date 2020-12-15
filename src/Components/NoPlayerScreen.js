import React from 'react'
import { Button } from 'react-bootstrap'
import FooterButtons from './FooterButtons'

function NoPlayerScreen() {

    return (
        <div className="tournament">
            <div className="tournament_content">
                <p>You have not added players.</p>
                <Button href="/addPlayer">Add Now</Button>
            </div>
        </div>
    )
}

export default NoPlayerScreen
