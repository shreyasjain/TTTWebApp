import React, { useState, useEffect } from 'react'
import "../Styles/Tournament_Home.scss"
import FooterButtons from './FooterButtons'
import { Nav } from 'react-bootstrap'
import TournamentCard from './TournamentCard'
import Axios from 'axios'
import { useHistory } from "react-router-dom"
import NoTournamentScreen from './NoTournamentScreen'

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

    const createCalled = (e => {
        // e.preventDefault()
        history.push("/createTournament")
    })


    useEffect(() => {
        document.getElementById("footer-tournament-btn").click()
        document.getElementById("default_btn").click()
    }, [1])

    return (
        <div className="tournament_available">
            <div className="tournament_content_available">
                <div className="tournament_heading">
                    <strong>Tournaments</strong>
                </div>

                <div className="tournament_buttons_top">
                    <Nav variant="tabs" defaultActiveKey="/home">
                        <Nav.Item>
                            <Nav.Link eventKey="link-1" onClick={e => ongoingClicked(e)}>Ongoing</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2" id="default_btn" onClick={e => upcomingClicked(e)}>Upcoming</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-3" onClick={e => previousClicked(e)}>Previous</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>

                <button className="fixedbutton" onClick={e => createCalled(e)}>+</button>

                <div className="tournament_cards_container" style={{"marginBottom":"4rem"}} id="tournament_home_div">
                    {currentData!="" ? currentData.map(data => {
                        return (<TournamentCard key={temp++} id={data.id} startDate={data.startDate} players={data.players} name={data.name} registrationLastDate={data.registrationLastDate.substring(0, 10)} />)
                    })
                        : (<NoTournamentScreen />)}
                </div>
            </div>
            <FooterButtons />
        </div>

    )
}

export default Tournament_Home
