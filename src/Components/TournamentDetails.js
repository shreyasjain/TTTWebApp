import React, { useState } from 'react'
import TournamentPlayedCard from './TournamentPlayedCard'
import "../Styles/TournamentDetails.scss"
import Axios from 'axios'
import { useHistory } from "react-router-dom"

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function TournamentDetails() {

    const id = localStorage.getItem("tournamentCardId")
    const [currentData, setCurrentData] = useState([])
    const history = useHistory()

    Axios.get(`http://139.59.16.180:8269/tournament/details/${id}`)
        .then(res => setCurrentData(res.data))
        .catch(err => console.log(err))

    const deleteCalled = (e => {
        e.preventDefault()
        Axios.get(`http://139.59.16.180:8269/tournament/delete/${id}`, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    })

    const backClicked = (e) => {
        e.preventDefault()
        history.push("/tournments")
    }

    const updateCalled = (e => {
        history.push("/updateTournament")
    })

    return (
        <div className="tournament_details">
            <div className="tournament_details_heading">
                <button id="back-button" onClick={e => backClicked(e)}><ArrowBackIcon /></button>
                <strong>Tournament Details</strong>
                <div></div>
            </div>
            <div className="tournament_details_container">

                <div className="other_details">
                    <h5>{currentData.name}</h5>
                    <span className="span_l">E-mail:   </span>
                    <span>broke@lesner.com</span>
                    <br />
                    <span className="span_l">Matches Played:   </span>
                    <span>{currentData.players}</span>
                    <br />
                    <span className="span_l">Matches Won:   </span>
                    <span>{currentData.players}</span>
                </div>

                <div className="fixed_buttons">
                    <button onClick={e => deleteCalled(e)}>Delete</button>
                    <button onClick={e => updateCalled(e)}>Update</button>
                </div>


                <div className="tournament_section">
                    <div className="playedInTournament">
                        <p className="playedIn_heading">Matches in Tournaments</p>
                    </div>
                    <div className="played_tournaments">
                        <span>Singles</span>
                        <br />
                        <span>Doubles</span>
                        <br />
                        <span>Mixed Doubles</span>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TournamentDetails
