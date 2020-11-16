import React from 'react'
import "../Styles/MatchScreen.scss"

function MatchScreen() {
    return (
        <div className="match-screen">
            <div className="match-screen_heading">
                <strong>Match</strong>
            </div>
            <div className="container1">
                <div className="match-screen-container match-screen-box">
                    <div className="match_screen_team1">
                        <h5>John Cena</h5>
                        <img src={require('../Media/dummy_dp.png')} />
                        <h2>12</h2>
                    </div>
                    <div className="match_screen_team2">
                        <h5>Broke Lesner</h5>
                        <img src={require('../Media/dummy_dp.png')} />
                        <h2>5</h2>
                    </div>
                </div>
                <div className="container2">
                    <div className="match-screen-versus match-screen-box">
                        <span>v/s</span>
                    </div>
                    <div className="match_screen_score_comparisons">
                        <div className="match_screen_score_comparison1">
                            <span>1</span>
                            <span>Set-1</span>
                            <span>1</span>
                        </div>
                        <div className="match_screen_score_comparison2">
                            <span>1</span>
                            <span>Set-2</span>
                            <span>1</span>
                        </div>
                        <div className="match_screen_score_comparison3">
                            <span>1</span>
                            <span>Set-3</span>
                            <span>1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MatchScreen
