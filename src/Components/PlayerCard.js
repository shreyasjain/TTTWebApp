import React from 'react'
import "../Styles/PlayerCard.scss"
import Axios from 'axios'
import {useHistory} from "react-router-dom"

function PlayerCard(props) {
    const history = useHistory();

    // console.log(props.image)

    const cardClicked = (e =>{
        e.preventDefault()
        localStorage.setItem("playerCardId",props.id)
        history.push("/playerDetails")
        // Axios.get(`http://139.59.16.180:8269/player/details/${props.id}`,
        //     { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
        //         .then(res => {
        //             console.log(res.data)
                    
        //             // setCurrentData(res.data)
        //         })
        //         .catch(err => console.log(err))
    })
    return (
        <div className="player_card" onClick={e=>cardClicked(e)}>
            <div className="tc_pic">
            <img src={props.image} alt="profile pic" />
            </div>
            <div className="player_details">
                <p>{props.name}</p>
                <span>{props.age} years</span>
                <span className="pd_sex">• {props.gender}</span>
            </div>
        </div>
    )
}

export default PlayerCard
