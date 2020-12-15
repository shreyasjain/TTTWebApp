import React from 'react'
import "../Styles/TournamentPlayedCard.scss"

function TournamentPlayedCard() {
    // if(!localStorage.getItem("token")){
    //     history.push("/")
    // }
    return (
        <div className="tournament_played_card">
            <div className="tc_pic tc_pic1">
            {/* <img src={require("../Media/dummy_dp.png")} alt="profile pic" /> */}
            </div>
            <div className="player_details_1">
                <p>Auriga TT Championship 2020</p>
            </div>
        </div>
    )
}

export default TournamentPlayedCard
