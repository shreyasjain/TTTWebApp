import React, { useState, useEffect } from 'react'
import "../Styles/PlayerDetails.scss"
import TournamentPlayedCard from "./TournamentPlayedCard"
import Axios from 'axios'
import { useHistory } from "react-router-dom"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Modal, Button} from "react-bootstrap"

function PlayerDetails() {
    
    const id = localStorage.getItem("playerCardId")
    const [currentData, setCurrentData] = useState([])
    const history = useHistory()
    const [modalShow1, setModalShow1] = useState(false)
    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <h4>{props.heading}</h4>
                    <p>
                        {props.message}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    // if(!localStorage.getItem("token")){
    //     history.push("/")
    // }
    const myFunction = (e)=>{
        e.preventDefault()
        document.getElementById("myDropdown").classList.toggle("show");
    }

    const updatePlayer = (e)=>{
        e.preventDefault()
        localStorage.setItem("playerToUpdate",id)
        history.push("/updatePlayer")
    }

    const deletePlyer = (e)=>{
        e.preventDefault()
        Axios.delete(`http://139.59.16.180:8269/player/delete/${id}`,
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
        .then(res => {
            setModalShow1(true)
            // alert("Player deleted.")
            history.push("/players")
        })
        .catch(err => console.log(err.message))
    }

    useEffect(() => {
        Axios.get(`http://139.59.16.180:8269/player/details/${id}`,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            .then(res => {
                console.log(res.data.data)
                setCurrentData(res.data.data)
            })
            .catch(err => console.log(err))

    }, [])

    const backClicked = (e) => {
        e.preventDefault()
        history.push("/players")
    }

    return (
        <div className="player_details">
            <div className="player_details_heading">
                <button id="back-button" onClick={e => backClicked(e)}><ArrowBackIcon /></button>
                <strong>Player Details</strong>
                <div class="dropdown">
                    <button onClick={e=>myFunction(e)} class="dropbtn"><MoreVertIcon/></button>
                    <div id="myDropdown" class="dropdown-content">
                        <button onClick={e=>updatePlayer(e)} className="dropdown-btn">Update</button>
                        <button onClick={e=>deletePlyer(e)} className="dropdown-btn">Delete</button>
                    </div>
                </div>
            </div>
            <div className="player_details_container">
                <div className="player_details_card">
                    <div className="tc_pic">
                        <img src={require("../Media/dummy_dp.png")} alt="profile pic" />
                    </div>
                    <div className="player_main_details">
                        <p>{currentData.name}</p>
                        <span>{currentData.age} years</span>
                        <br />
                        <span>{currentData.gender}</span>
                    </div>
                </div>

                <div className="other_details">
                    <span className="span_l">E-mail:   </span>
                    <span>{currentData.email}</span>
                    <br />
                    <span className="span_l">Matches Played:   </span>
                    <span>{currentData.matchPlayed}</span>
                    <br />
                    <span className="span_l">Matches Won:   </span>
                    <span>{currentData.wonMatches}</span>
                </div>


                <div className="tournament_section">
                    <div className="playedInTournament">
                        <p>Played in Tournaments</p>
                    </div>
                    <div className="played_tournaments">
                        <TournamentPlayedCard />
                    </div>
                </div>
                <MyVerticallyCenteredModal
                        message="Player Deleted Successfully."
                        show={modalShow1}
                        onHide={() => {setModalShow1(false);history.push("/players");}}
                    />
            </div>
        </div>
    )
}

export default PlayerDetails
