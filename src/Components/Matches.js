import React, { useEffect, useState } from 'react'
import { Form, Col, Row } from 'react-bootstrap'
import "../Styles/Matches.scss"
import MatchesCard from './MatchesCard'
import Axios from 'axios'
import {useHistory} from "react-router-dom"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function Matches() {
    
    const id = localStorage.getItem("tournamentCardId")
    const [currentData,setCurrentData] = useState("")
    

    const history = useHistory()
    // if(!localStorage.getItem("token")){
    //     history.push("/")
    // }

    useEffect(()=>{
        console.log(id)
        Axios.get(`http://139.59.16.180:8269/fixture/allFixtures/${id}`,
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
        .then(res=>{
            console.log(res.data)
            setCurrentData(res.data)
            
        })
        .catch(err=>{
            console.log(err.message)
        })

        

    },[])

    return (
        <div className="matches">
            <div className="matches_heading">
            <button id="back-button" onClick={e=>history.push("/tournamentDetails")}><ArrowBackIcon /></button>
                <strong>Matches</strong>
                <div></div>
            </div>
            <div className="matches_elements">
                <Form.Group className="row_align" as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        View Matches For:
                            </Form.Label>
                    <Col lg="8">
                        <Form.Control as="select" defaultValue="Choose..." title="Choose">
                            <option>Singles</option>
                            <option>Doubles</option>
                            <option>Mixed</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
            </div>
            <div className="matches_cards">
                {
                    currentData!=""?
                    currentData.map(data=>{
                        if(data.player1==-1 || data.player1==0 ||data.player2==-1 || data.player2==0){}
                        else{return <MatchesCard key={data.id} id={data.id} date={data.matchDate} matchNumber={data.matchNumber} player1={data.player1} player2={data.player2} />}
                    }):
                    <div>
                    <MatchesCard date="{data.matchDate}" matchNumber="{data.matchNumber}" player1="{data.player1}" player2="{data.player2}"/>
                    <MatchesCard date="{data.matchDate}" matchNumber="{data.matchNumber}" player1="{data.player1}" player2="{data.player2}"/>
                    </div>
                }
            </div>
        </div>
    )
}

export default Matches
