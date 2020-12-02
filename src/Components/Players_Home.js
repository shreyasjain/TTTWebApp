import React, { useEffect, useState } from 'react'
import "../Styles/Players_Home.scss"
import {useHistory} from "react-router-dom"
import FooterButtons from './FooterButtons'
import PlayerCard from './PlayerCard'
import Axios from 'axios'
import NoPlayerScreen from './NoPlayerScreen'

function Players_Home() {
    const history = useHistory();
    let [currentData, setCurrentData] = useState([])
    let temp = 0

    const addCalled = (e)=>{
        history.push("/addPlayer")
    }

    useEffect(() => {
        Axios.get("http://139.59.16.180:8269/player/allPlayers",

            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            .then(res => {
                console.log(res.data)
                setCurrentData(res.data)
            })
            .catch(err => { console.log(err) })
    }, [])

    useEffect(() => {
        document.getElementById("footer-players-btn").click()
    }, [1])

    return (
        <div className="players_available">
            <div className="players-heading">
                <strong>Players</strong>
            </div>
            <div className="player_cards_container" style={{"marginBottom":"4rem"}}>
                {currentData!="" ? currentData.map(data => {
                    return (<PlayerCard key={data.id} id={data.id} name={data.name} age={data.age} gender={data.gender} registrationLastDate={data.registrationLastDate} />)
                })
                    : (<NoPlayerScreen />)}
            </div>
            {/* <button className="fixedbutton" onClick={e=>{addPlayer(e)}}>+</button> */}
            <button className="fixedbutton" onClick={e => addCalled(e)}>+</button>
            <FooterButtons />
        </div>
    )
}

export default Players_Home
