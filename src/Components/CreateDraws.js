import React, { useState, useEffect } from 'react'
import "../Styles/CreateDraws.scss"
import { Row, Col, Form } from 'react-bootstrap'
import CreateDrawCard from './CreateDrawCard'
import "../Styles/CreateDraws.scss"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import NoPlayerScreen from './NoPlayerScreen'
import Axios from 'axios'
import { useHistory } from "react-router-dom"

function CreateDraws() {

    const players = []

    const callbackFunction = (childData) => {
        // const index = players.indexOf(childData);
        // if (index > -1) {
        //     players.splice(index, 1);
        // }
        // else {
            players.push(childData.toString())
        // }
        console.log(players)
    }

    const removeCallbackfn = (childData) =>{
        const index = players.indexOf(childData.toString());
        // console.log(index)
        if (index > -1) {
            players.splice(index, 1);
        }
        console.log(players)
    }


    const [currentData, setCurrentData] = useState("")
    // const [value,setValue] = useState("")
    const [matchType, setMatchType] = useState("")
    const history = useHistory()

    useEffect(() => {
        Axios.get("http://139.59.16.180:8269/player/allPlayers",
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            .then(res => {
                console.log(res.data)
                setCurrentData(res.data)

            })
            .catch(err => { console.log(err) })
    }, [])

    const generateDraws = (e) => {
        Axios.post(`http://139.59.16.180:8269/fixture/create/${matchType}`)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        history.push("/matches")
    }

    const backClicked = (e) => {
        history.push("/tournamentDetails")
    }

    const searchPlayers = (e) => {

        // const [players, setPlayers] = useState([])
        // setPlayers("[1]")
        // console.log(players)
    }

    return (
        <div className="create_draws">
            <div className="create_draws_heading">
                <button id="back-button" onClick={e => backClicked(e)}><ArrowBackIcon /></button>
                <strong>Create Draws</strong>
                <div></div>
            </div>
            <div className="create_draws_top_elements">
                <Form.Group className="row_align" as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Match type:
                            </Form.Label>
                    <Col lg="10">
                        <Form.Control as="select" onChange={e => { setMatchType(e) }} defaultValue="Choose...">
                            <option value="" >Choose...</option>
                            <option value="Singles" >Singles</option>
                            <option value="Doubles" >Doubles</option>
                            <option value="Mixed" >Mixed</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group controlId="formBasicSearch">
                    <Form.Control type="text" placeholder="Search" />
                </Form.Group>
            </div>
            <div className="create_draws_cards">
                <CreateDrawCard id={995} addCallback={callbackFunction} removeCallback={removeCallbackfn} />
                <CreateDrawCard id={996} addCallback={callbackFunction} removeCallback={removeCallbackfn} />
                <CreateDrawCard id={997} addCallback={callbackFunction} removeCallback={removeCallbackfn} />
                <CreateDrawCard id={998} addCallback={callbackFunction} removeCallback={removeCallbackfn} />
                <CreateDrawCard id={999} addCallback={callbackFunction} removeCallback={removeCallbackfn} />

                {/* {currentData != "" ? currentData.map(data => {
                    return (<CreateDrawCard key={data.id} id={data.id} name={data.name} age={data.age} gender={data.gender} registrationLastDate={data.registrationLastDate} addCallback={callbackFunction} />)
                })
                    : (<NoPlayerScreen />)} */}
            </div>
            <div>
                <button className="create-draws-btn" onClick={e => { generateDraws(e) }}>Generate Draws</button>
            </div>
        </div>
    )
}

export default CreateDraws 
