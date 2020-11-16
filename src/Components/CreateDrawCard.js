import React from 'react'
import "../Styles/CreateDrawCard.scss"

function CreateDrawCard() {
    return (
        <div className=" player_card create_draw_card">
            <div className="player_card_row1">
                <div className="player_card_row1_data">
                    <div className="tc_pic">
                        <img src={require("../Media/dummy_dp.png")} alt="profile pic" />
                        
                    </div>
                    <div className="player_details">
                        <p>John Cena</p>
                        <span>26 years</span>
                        <span className="pd_sex">• Male</span>
                        
                    </div>
                </div>
                <div className="player_card_roundButton">
                    <btn>Click</btn>
                </div>
                
            </div>
            <div className="player_card_row2">
            <button>CLick</button>
                <span>Adding  seed rank is optional</span>
            </div>
            
        </div>
    )
}

export default CreateDrawCard
