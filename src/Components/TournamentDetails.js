import React, { useState, useEffect } from 'react'
import TournamentPlayedCard from './TournamentPlayedCard'
import "../Styles/TournamentDetails.scss"
import Axios from 'axios'
import { useHistory } from "react-router-dom"
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import {Modal, Button} from "react-bootstrap"

function TournamentDetails() {
    
    const id = localStorage.getItem("tournamentCardId")
    const [currentData, setCurrentData] = useState([])
    const [matchesCreated,setMatchesCreated] = useState("")
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
    const history = useHistory()
    // if(!localStorage.getItem("token")){
    //     history.push("/")
    // }
    const myFunction = (e)=>{
        e.preventDefault()
        document.getElementById("myDropdown").classList.toggle("show");
    }

    useEffect(() => {
        Axios.get(`http://139.59.16.180:8269/tournament/details/${id}`,
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") }})
            .then(res => {
                console.log(res.data.data)
                setCurrentData(res.data.data)
                
            })
            .catch(err => console.log(err))

            Axios.get(`http://139.59.16.180:8269/fixture/allFixtures/${id}`,
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
        .then(res=>{
            setMatchesCreated(true)
            
        })
        .catch(err=>{
            setMatchesCreated(false)
        })


    }, [])

    const backClicked = (e) => {
        e.preventDefault()
        history.push("/tournaments")
    }

    const updateClicked = (e)=>{
        e.preventDefault()
        localStorage.setItem("idToUpdate",id)
        history.push("/updateTournament")

    }

    const cloneTournament = (e)=>{
        e.preventDefault()
        var formData = new FormData()

        formData.append("file", currentData.imageUrl);
        const theWrapper = {
            "data": {
                "name": currentData.name,
                "startDate": currentData.startDate,
                "registrationLastDate": currentData.regEndDate,
                "maxSetScore": currentData.maxScore,
                "matchType": currentData.matches,
                "status": "upcoming",
                "createdDate": 1605605229000,
                "modifiedDate": 1605605229000,
                "players": currentData.players,
                "endDate":currentData.endDate
            }
        }

        formData.append("theWrapper", JSON.stringify(theWrapper))

        Axios.post("http://139.59.16.180:8269/tournament/create",
            formData,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        ).then(res => {
            console.log(res)
            alert("Tournament cloned successfully")
            history.push("/tournaments")
        })
            .catch(err => { console.log(err.message) })
    }

    const deleteTournament = (e)=>{
        e.preventDefault()
        console.log("delete called")
        Axios.delete(`http://139.59.16.180:8269/tournament/delete/${id}`,
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
        .then(res => {
            setModalShow1(true)
            // alert("Tournament deleted.")
            history.push("/tournaments")
        })
        .catch(err => console.log(err.message))
    }

    const createDrawsClicked = (e)=>{
        history.push("/createDraws")
    }

    const viewDrawsClicked = (e)=>{
        history.push("/matches")
    }

    return (
        <div className="tournament_details">
            <div className="tournament_details_heading">
                <button id="back-button" onClick={e => backClicked(e)}><ArrowBackIcon /></button>
                <strong>Tournament Details</strong>
                {/* <MoreVertIcon /> */}
                <div class="dropdown">
                    <button onClick={e=>myFunction(e)} class="dropbtn"><MoreVertIcon/></button>
                    <div id="myDropdown" class="dropdown-content">
                        <button onClick={e=>cloneTournament(e)} className="dropdown-btn">Clone</button>
                        <button onClick={e=>deleteTournament(e)} className="dropdown-btn">Delete</button>
                    </div>
                </div>
            </div>
            <div className="tournament_details_container">

                <div className="other_details">
                    <h5>{currentData.name}</h5>
                    <span className="span_l">Started On:   </span>
                    <span>{(currentData != "") ? currentData.startDate.substring(0, 10) : (<></>)}</span>
                    <br />
                    <span className="span_l">Status:   </span>
                    <span>{currentData.status}</span>
                    <br />
                    <span className="span_l">Maximum score per set:   </span>
                    <span>{currentData.maxSetScore}</span>
                    <br />
                    <span className="span_l">Total Players:   </span>
                    <span>{(currentData.players) ? currentData.players.length : (<>0</>)}</span>
                </div>

                {/* <div className="fixed_buttons">
                    <button onClick={e => deleteCalled(e)}>Delete</button>
                    <button onClick={e => updateCalled(e)}>Update</button>
                </div> */}


                <div className="tournament_section">
                    <div className="playedInTournament">
                        <p className="playedIn_heading">Matches in Tournaments</p>
                    </div>
                    <div className="played_tournaments played_tournaments1">
                        {(currentData != "") ? currentData.matchType.map(data => {
                            return (<>
                                <span>{data}</span>
                                <br />
                            </>
                            )
                        })
                            : (<p>No Matches</p>)}
                    </div>
                    <button onClick={e=>{updateClicked(e)}} className="fixedbutton round-btns"><EditIcon/></button>
                    <div>{matchesCreated?
                    <button className="create-draws-btn td-btn" onClick={e=>{viewDrawsClicked(e)}}>View Matches</button>
                    :<button className="create-draws-btn td-btn" onClick={e=>{createDrawsClicked(e)}}>Add Players</button>}
                        
                    </div>
                    
                </div>
            </div>
            <MyVerticallyCenteredModal
                        message="Tournament Deleted Successfully."
                        show={modalShow1}
                        onHide={() => {setModalShow1(false);history.push("/players");}}
                    />
        </div>
    )
}

export default TournamentDetails
