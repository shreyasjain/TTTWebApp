import React, { useState, useEffect } from 'react'
import "../Styles/PlayerDetails.scss"
import TournamentPlayedCard from "./TournamentPlayedCard"
import Axios from 'axios'
import { useHistory } from "react-router-dom"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function PlayerDetails() {

    const id = localStorage.getItem("playerCardId")
    const [currentData, setCurrentData] = useState([])
    const history = useHistory()

    useEffect(() => {
        Axios.get(`http://139.59.16.180:8269/player/details/${id}`,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            .then(res => {
                console.log(res.data)
                setCurrentData(res.data)
            })
            .catch(err => console.log(err))

    }, [])

    const backClicked = (e) => {
        e.preventDefault()
        history.push("/players")
    }

    return (
        <div className="player_details">
            <div className="player_details_heading">
                <button id="back-button" onClick={e => backClicked(e)}><ArrowBackIcon /></button>
                <strong>Player Details</strong>
                <div></div>
            </div>
            <div className="player_details_container">
                <div className="player_details_card">
                    <div className="tc_pic">
                        <img src={require("../Media/dummy_dp.png")} alt="profile pic" />
                    </div>
                    <div className="player_main_details">
                        <p>{currentData.name}</p>
                        <span>{currentData.age}</span>
                        <br />
                        <span>{currentData.gender}</span>
                    </div>
                </div>

                <div className="other_details">
                    <span className="span_l">E-mail:   </span>
                    <span>{currentData.email}</span>
                    <br />
                    <span className="span_l">Matches Played:   </span>
                    <span>{currentData.matchPlayed}</span>
                    <br />
                    <span className="span_l">Matches Won:   </span>
                    <span>{currentData.wonMatches}</span>
                </div>


                <div className="tournament_section">
                    <div className="playedInTournament">
                        <p>Played in Tournaments</p>
                    </div>
                    <div className="played_tournaments">
                        <TournamentPlayedCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerDetails
