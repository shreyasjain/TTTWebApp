import React from 'react'
import "../Styles/TournamentCard.scss"
import {useHistory} from "react-router-dom"

function TournamentCard(props) {

    const history = useHistory();
    const tournamentCardClicked = (e =>{
        e.preventDefault()
        localStorage.setItem("tournamentCardId",props.id)
        history.push("/tournamentDetails")
    })

    return (
        <div className="tournament_card" onClick={e=>tournamentCardClicked(e)}>
            <div className="tc_pic">
                <img src={require("../Media/welcome.png")} />
            </div>
            <div className="tc_details">
                <p>{props.name}</p>
                <span className="tcd_l">Starts on: </span>
                <span>{props.startDate.substring(0, 10)}</span>
                <br />
                <span className="tcd_l">Last date of registration: </span> 
                <span>{props.registrationLastDate}</span>
            </div>
        </div>
    )
}

export default TournamentCard
