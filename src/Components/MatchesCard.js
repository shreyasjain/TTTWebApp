import React from 'react'
import "../Styles/MatchesCard.scss"

function MatchesCard() {
    return (
        <div className="matches_card">
            <div className="matches_card_heading">
                <h6><strong>Match 1</strong></h6>
            </div>
            <div className="matches_card_main">
                <div className="matches_card_left">
                    <img src={require("../Media/dummy_dp.png")} />
                    <p><strong>John Cena</strong></p>
                    <p>Rank- 11</p>
                </div>
                <div className="matches_card_right">
                <img src={require("../Media/dummy_dp.png")} />
                    <p><strong>John Cena</strong></p>
                    <p>Rank- 11</p>
                </div>
            </div>
            {/* <div className="matches_card_versus">
                <p>v/s</p>
            </div> */}
        </div>
    )
}

export default MatchesCard
