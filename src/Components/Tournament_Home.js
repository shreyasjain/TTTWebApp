import React, { useState, useEffect } from 'react'
import "../Styles/Tournament_Home.scss"
import FooterButtons from './FooterButtons'
import { Button, ButtonGroup } from 'react-bootstrap'
import TournamentCard from './TournamentCard'
import Axios from 'axios'
import {useHistory} from "react-router-dom"

function Tournament_Home() {

    let [currentData, setCurrentData] = useState([])
    let temp = 0
    const history = useHistory();

    const ongoingClicked = (e => {
        Axios.get("http://139.59.16.180:8269/tournament/onGoing")
            .then(res => {
                console.log(res.data)
                setCurrentData(res.data)
            })
            .catch(err => { console.log(err) })
    })

    const upcomingClicked = (e => {
        Axios.get("http://139.59.16.180:8269/tournament/upComing")
            .then(res => {
                console.log(res)
                setCurrentData(res.data)
            })
            .catch(err => { console.log(err) })
    })

    const previousClicked = (e => {
        Axios.get("http://139.59.16.180:8269/tournament/completed")
            .then(res => {
                console.log(res)
                setCurrentData(res.data)
            })
            .catch(err => { console.log(err) })
    })

    const createCalled = (e =>{
        // e.preventDefault()
        history.push("/createTournament")
    })

    


    return (


        // <div className="tournament">
        //     <div className="tournament_heading">
        //         <strong>Tournaments</strong>
        //     </div>
        //     <div className="tournament_content">
        //         <p>Create your first tournament.</p>
        //         <Button>Create</Button>
        //     </div>

        //     <FooterButtons />
        // </div>


        <div className="tournament_available">
            <div className="tournament_content_available">
                <div className="tournament_heading">
                    <strong>Tournaments</strong>
                </div>

                <div className="tournament_buttons_top">
                    <ButtonGroup aria-label="Basic example">
                        <Button id="default_button1" onClick={e => ongoingClicked(e)} variant="secondary">Ongoing</Button>
                        <Button onClick={e => upcomingClicked(e)} variant="secondary">Upcoming</Button>
                        <Button onClick={e => previousClicked(e)} variant="secondary">Previous</Button>
                    </ButtonGroup>
                </div>

                <button id="fixedbutton" onClick={e => createCalled(e)}>+</button>

                <div className="tournament_cards_container" id="tournament_home_div">
                    {currentData.map(data =>{
                        return(<TournamentCard key={temp++} startDate={data.startDate} players={data.players} name={data.name} />)
                    })}
                </div>
            </div>
            <FooterButtons />
        </div>

    )
}

export default Tournament_Home
