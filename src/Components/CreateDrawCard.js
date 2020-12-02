import React from 'react'
import "../Styles/CreateDrawCard.scss"

function CreateDrawCard(props) {

    // const [players,setPlayers] = useState("")
    // const players = []
    // let data = 0

    const addButtonClicked =(e)=>{
        props.addCallback(props.id);
    }

    const removeButtonClicked = (e)=>{
        props.removeCallback(props.id);
    }

    return (
        <div className=" player_card create_draw_card">
            <div className="player_card_row1 draw_card_row1">
                <div className="player_card_row1_data draw_card_row1_data">
                    <div className="tc_pic draw_pic">
                        <img src={require("../Media/dummy_dp.png")} alt="profile pic" />
                        
                    </div>
                    <div className="player_details draw_details">
                        <p>{props.name}</p>
                        <span>{props.age} years</span>
                        <span className="pd_sex">• {props.gender}</span>
                        
                    </div>
                </div>
                <div className="player_card_roundButton draw_card_roundButton">
                    <button className="draw-roundBtn" onClick={e=>addButtonClicked(e)}>+</button>
                </div>
                <div className="player_card_roundButton draw_card_roundButton draw_card_roundButton1">
                    <button className="draw-roundBtn draw-roundBtn1" onClick={e=>removeButtonClicked(e)}>-</button>
                </div>
            </div>
            <div className="player_card_row2 draw_card_row2">
            <button className="seed-rank-button">CLick</button>
                <span>Adding  seed rank is optional</span>
            </div>
            
        </div>
    )
}

export default CreateDrawCard
