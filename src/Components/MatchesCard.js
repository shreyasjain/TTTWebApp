import React, { useEffect, useState } from 'react'
import "../Styles/MatchesCard.scss"
import Axios from 'axios'
import {useHistory} from "react-router-dom"

function MatchesCard(props) {
    
    const [player1,setPlayer1] = useState("")
    const [player2,setPlayer2] = useState("")
    const history = useHistory()

    useEffect(() => {
        if(props.player1!="-1" && props.player1!=0){
        Axios.get(`http://139.59.16.180:8269/player/details/${props.player1}`,
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
        .then(res=>{setPlayer1(res.data.data.name)})
        .catch(err=>{console.log(err.message)})}
        else{setPlayer1("X")}
        
        if(props.player2!="-1" && props.player2!=0){
        Axios.get(`http://139.59.16.180:8269/player/details/${props.player2}`,
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
        .then(res=>{setPlayer2(res.data.data.name)})
        .catch(err=>{console.log(err.message)})}
        else{setPlayer2("X")}

        setPlayer1("shreyas")
        setPlayer2("Prachi")
    }, [])

    const matchCardClicked = (e)=>{
        localStorage.setItem("fixtureId",props.id)
        history.push("/matchScreen")
    }

    return (
        <div className="ttapp-card" onClick={e=>{matchCardClicked(e)}} className="matches_card">
            <div className="matches_card_heading">
                <h6><strong>Match {props.matchNumber}</strong></h6>
                <span>{props.date}</span>
            </div>
            <div className="matches_card_main">
                <div className="matches_card_left">
                    <img src={require("../Media/dummy_dp.png")} />
                    <p><strong>{player1}</strong></p>
                    {/* <p>Rank- </p> */}
                </div>
                <div className="matches_card_versus">
                <p>v/s</p>
            </div>
                <div className="matches_card_right">
                <img src={require("../Media/dummy_dp.png")} />
                    <p><strong>{player2}</strong></p>
                    {/* <p>Rank- </p> */}
                </div>
            </div>
            
        </div>
    )
}

export default MatchesCard
