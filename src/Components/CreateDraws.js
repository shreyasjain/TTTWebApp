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

    // console.log(localStorage.getItem("tournamentCardId"))

    const [input, setInput] = useState("")
    const [search, setSearch] = useState([])

    let players = []

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

    const removeCallbackfn = (childData) => {
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
    // if(!localStorage.getItem("token")){
    //     history.push("/")
    // }
    useEffect(() => {
        Axios.get("http://139.59.16.180:8269/player/allPlayers",
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            .then(res => {
                console.log(res.data.data[0])
                setCurrentData(res.data.data)
                setSearch(res.data.data)
            })
            .catch(err => { console.log(err) })
    }, [])

    const generateDraws = (e) => {

        var formData = new FormData()
        const theWrapper = {
            "id": localStorage.getItem("tournamentCardId"),
            "playersAdded": players
        }
        formData.append("id", localStorage.getItem("tournamentCardId"))
        console.log(players)
        formData.append("playersAdded", JSON.stringify(players))

        // console.log(formData)


        Axios.post(`http://139.59.16.180:8269/fixture/create/${matchType}`,
            formData,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        )
            .then(res => {
                console.log(res)

                history.push("/matches")
            })
            .catch(err => {
                console.log(err)
            })

    }

    const backClicked = (e) => {
        history.push("/tournamentDetails")
    }

    const changeMatchType = (e) => {
        e.preventDefault()
        setMatchType(e.target.value)
    }

    const handleSearch = (e) => {
        setInput(e.target.value.toLowerCase())
    }

    useEffect(() => {
        if (currentData != "") {
            const result = currentData.filter(data => {
                if (data.name.toLowerCase().includes(input)) { return data }
            })
            setSearch(result)
            console.log(result)
        }

    }, [input])

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
                        <Form.Control as="select" onChange={e => { changeMatchType(e) }} defaultValue="single">
                            <option value="single" >Singles</option>
                            <option value="Doubles" >Doubles</option>
                            <option value="Mixed" >Mixed</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group controlId="formBasicSearch">
                    <Form.Control type="text" value={input} placeholder="Search" onChange={e => handleSearch(e)} />
                </Form.Group>
            </div>
            <div className="create_draws_cards">
                {/* <CreateDrawCard name="" id={995} addCallback={callbackFunction} removeCallback={removeCallbackfn} />
                <CreateDrawCard name="" id={996} addCallback={callbackFunction} removeCallback={removeCallbackfn} />
                <CreateDrawCard name="" id={997} addCallback={callbackFunction} removeCallback={removeCallbackfn} />
                <CreateDrawCard name="" id={998} addCallback={callbackFunction} removeCallback={removeCallbackfn} />
                <CreateDrawCard name="" id={999} addCallback={callbackFunction} removeCallback={removeCallbackfn} /> */}

                {(input == "" && currentData != "") ?
                    currentData.map(data => {
                        return <CreateDrawCard key={data.id} id={data.id} name={data.name} age={data.age} gender={data.gender} registrationLastDate={data.registrationLastDate} addCallback={callbackFunction} removeCallback={removeCallbackfn} />
                    })
                    : search.map(data => {
                        return <CreateDrawCard key={data.id} id={data.id} name={data.name} age={data.age} gender={data.gender} registrationLastDate={data.registrationLastDate} addCallback={callbackFunction} removeCallback={removeCallbackfn} />
                    })}

            </div>
            <div>
                <button className="create-draws-btn" onClick={e => { generateDraws(e) }}>Generate Draws</button>
            </div>
        </div>
    )
}

export default CreateDraws 
