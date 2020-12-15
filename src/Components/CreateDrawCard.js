import React, { useState, useEffect } from 'react'
import "../Styles/CreateDrawCard.scss"

function CreateDrawCard(props) {

    // const [players,setPlayers] = useState("")
    // const players = []
    // let data = 0
    // if(!localStorage.getItem("token")){
    //     history.push("/")
    // }

    const [button1, setButton1] = useState(false)
    const [button2, setButton2] = useState(true)

    useEffect(()=>{
        
    },[])

    const addButtonClicked = (e) => {
        props.addCallback(props.id);
        setButton2(false)
        setButton1(true)
    }

    const removeButtonClicked = (e) => {
        props.removeCallback(props.id);
        setButton1(false)
        setButton2(true)
    }

    return (
        <div className=" player_card create_draw_card ttapp-card" >
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
                {button2 &&
                    <>
                        <div className="player_card_roundButton draw_card_roundButton">
                            <button className="draw-roundBtn round-btns" onClick={e => addButtonClicked(e)}>+</button>
                        </div>
                    </>
                }
                {button1 &&
                    <>
                    <div className="player_card_roundButton draw_card_roundButton draw_card_roundButton1">
                        <button className="draw-roundBtn draw-roundBtn1 round-btns" onClick={e => removeButtonClicked(e)}>-</button>
                    </div>
                </>
                }
            </div>
            {/* <div className="player_card_row2 draw_card_row2">
                <button className="seed-rank-button">CLick</button>
                <span>Adding  seed rank is optional</span>
            </div> */}

        </div>
    )
}

export default CreateDrawCard
