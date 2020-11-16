import React, { useState } from 'react'
import "../Styles/CreateTournament.scss"
import { Button, Form, Row, Col } from 'react-bootstrap'
import Axios from 'axios'

function CreateTournament() {

    const [name,setName] = useState("")
    const [players,setPlayers] = useState("")
    const [startDate,setStartDate] = useState("")
    const [regEndDate, setRegEndDate] = useState("")
    const [maxScore,setMaxScore] = useState("")

    const createClicked = (e =>{
        e.preventDefault()
        Axios.post("http://139.59.16.180:8269/tournament/create",{
            "name":name,"players":players,"startDate":startDate
        },{ headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        ).then(res => {console.log(res)})
        .catch(err => console.log(err))
    })

    return (
        <div className="create-tournament">
            <div className="create_tournament_heading">
                <strong>Create</strong>
            </div>
            <div className="myProfile_dp">
                <div className="myProfile_pic">
                    <img src={require("../Media/dummy_dp.png")} alt="profile pic" />
                </div>
                <a href="http://www.google.com">Add image</a>
            </div>
            <div className="addPlayer_form">
                <div className="addPlayer_form_contents">
                    <Form>
                        <Form.Group controlId="formBasicText">
                            <Form.Control type="text" placeholder="Tournament Name" onChange={e => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formBasicText">
                            <Form.Control type="text" placeholder="Start Date (DD/MM/YY)" onChange={e => setStartDate(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicText">
                            <Form.Control type="text" placeholder="Registration End Date" onChange={e => setRegEndDate(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="row_align" as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                Max score per set
                            </Form.Label>
                            <Col lg="10">
                            <Form.Control type="number" placeholder="Max score" onChange={e => setMaxScore(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group className="row_align" as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                Maximum players
                            </Form.Label>
                            <Col lg="10">
                            <Form.Control type="number" placeholder="Players" onChange={e => setPlayers(e.target.value)}/>
                            </Col>
                        </Form.Group>

                        <div className="create_tournament_checkboxes">
                            <h5>Matches In The Tournament</h5>
                        {['checkbox'].map((type) => (
                            <div key={`custom-inline-${type}`} className="mb-3">
                            <Form.Check
                                custom
                                inline
                                label="Men's singles"
                                type={type}
                                id={`custom-inline-${type}-1`}
                            />
                            </div>
                        ))}
                        {['checkbox'].map((type) => (
                            <div key={`custom-inline-${type}`} className="mb-3">
                            <Form.Check
                                custom
                                inline
                                label="Women's singles"
                                type={type}
                                id={`custom-inline-${type}-2`}
                            />
                            </div>
                        ))}
                        {['checkbox'].map((type) => (
                            <div key={`custom-inline-${type}`} className="mb-3">
                            <Form.Check
                                custom
                                inline
                                label="Men's doubles"
                                type={type}
                                id={`custom-inline-${type}-3`}
                            />
                            </div>
                        ))}
                        {['checkbox'].map((type) => (
                            <div key={`custom-inline-${type}`} className="mb-3">
                            <Form.Check
                                custom
                                inline
                                label="Women's singles"
                                type={type}
                                id={`custom-inline-${type}-4`}
                            />
                            </div>
                        ))}
                        {['checkbox'].map((type) => (
                            <div key={`custom-inline-${type}`} className="mb-3">
                            <Form.Check
                                custom
                                inline
                                label="Mixed doubles"
                                type={type}
                                id={`custom-inline-${type}-5`}
                            />
                            </div>
                        ))}
                        </div>
                        <Button variant="primary" type="submit" onClick={e => createClicked(e)}>Save</Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default CreateTournament
