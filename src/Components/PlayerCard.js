import React from 'react'

function PlayerCard() {
    return (
        <div className="player_card">
            <div className="tc_pic">
            <img src={require("../Media/dummy_dp.png")} alt="profile pic" />
            </div>
            <div className="player_details">
                <p>John Cena</p>
                <span>26 years</span>
                <span className="pd_sex">• Male</span>
            </div>
        </div>
    )
}

export default PlayerCard
