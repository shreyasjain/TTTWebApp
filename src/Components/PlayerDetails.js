import React from 'react'
import "../Styles/PlayerDetails.scss"
import TournamentPlayedCard from "./TournamentPlayedCard"

function PlayerDetails() {
    return (
        <div className="player_details">
            <div className="player_details_heading">
                <strong>Players</strong>
            </div>
            <div className="player_details_container">
                <div className="player_details_card">
                    <div className="tc_pic">
                        <img src={require("../Media/dummy_dp.png")} alt="profile pic" />
                    </div>
                    <div className="player_main_details">
                        <p>John Cena</p>
                        <span>26 years</span>
                        <br />
                        <span>Male</span>
                    </div>
                </div>

                <div className="other_details">
                    <span className="span_l">E-mail:   </span>
                    <span>broke@lesner.com</span>
                    <br />
                    <span className="span_l">Matches Played:   </span>
                    <span>17</span>
                    <br />
                    <span className="span_l">Matches Won:   </span>
                    <span>10</span>
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
