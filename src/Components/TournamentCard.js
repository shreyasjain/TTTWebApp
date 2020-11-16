import React from 'react'
import "../Styles/TournamentCard.scss"

function TournamentCard(props) {
    return (
        <div className="tournament_card">
            <div className="tc_pic">
                <img src={require("../Media/welcome.png")} />
            </div>
            <div className="tc_details">
                <p>{props.name}</p>
                <span className="tcd_l">Starts on: </span>
                <span>{props.startDate.substring(0, 10)}</span>
                <br />
                {/* <span className="tcd_l">Last date of registration: </span> 
                <span>15 Jan, 2020</span> */}
                <span className="tcd_l">Players: </span>
                <span>{props.players}</span>
            </div>
        </div>
    )
}

export default TournamentCard
