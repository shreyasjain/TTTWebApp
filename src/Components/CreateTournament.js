import React, { useState } from 'react'
import "../Styles/CreateTournament.scss"
import { Button, Form, Row, Col } from 'react-bootstrap'
import Axios from 'axios'
import { useHistory } from "react-router-dom"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function CreateTournament() {

    const history = useHistory()
    const [name, setName] = useState("")
    const [startDate, setStartDate] = useState("")
    const [regEndDate, setRegEndDate] = useState("")
    const [maxScore, setMaxScore] = useState("")
    const [image, setImage] = useState("")
    const [matches, setMatches] = useState([])
    
    const backClicked = (e) => {
        e.preventDefault()
        history.push("/tournaments")
    }

    const createClicked = (e => {
        e.preventDefault()

        let array = []
        let checkboxes = document.getElementsByClassName("ct-checkbox")
        for (var i = 0; i < checkboxes.length; i++) {
            array.push(checkboxes[i].value)
        }
        console.log(checkboxes)
        // setMatches(array)
        console.log(array)

        //Blank Entries
        if (name === "" || startDate === "" || regEndDate === "" || maxScore === "" || image === "") {
            alert("Please fill all entries.")
            return
        }

        var formData = new FormData()
        formData.append("file", image);
        const theWrapper = {
            "data": {
                "name": name,
                "startDate": startDate,
                "registrationLastDate": regEndDate,
                "maxSetScore": maxScore,
                "matchType": matches,
                "status": "upcoming",
                "createdDate": 1605605229000,
                "modifiedDate": 1605605229000,
                "players": [
                    "ketan",
                    "rusmeen",
                    "rahul"]
            }
        }

        formData.append("theWrapper", JSON.stringify(theWrapper))

        Axios.post("http://139.59.16.180:8269/tournament/create",
            formData,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        ).then(res => {
            console.log(res)
            alert("Tournament created successfully")
            history.push("/tournaments")
        })
            .catch(err => { alert(err.message) })
    })



    return (
        <div className="create-tournament">
            <div className="create_tournament_heading">
                <button id="back-button" onClick={e => backClicked(e)}><ArrowBackIcon /></button>
                <strong>Create</strong>
                <div></div>
            </div>
            <div className="myProfile_dp">
                <div className="myProfile_pic">
                    <img src={require("../Media/dummy_dp.png")} alt="profile pic" />
                </div>
            </div>
            <div className="addPlayer_form">
                <div className="addPlayer_form_contents">
                    <Form>
                        <label htmlFor="file-upload" className="custom-file-upload">
                            <i className="fa fa-cloud-upload"></i> Add image
                        </label>
                        <input type="file" id="file-upload"
                            onChange={e => setImage(e.target.files[0])}
                        />
                        <Form.Group controlId="formBasicText">
                            <Form.Control type="text" placeholder="Tournament Name" onChange={e => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formBasicText">
                            <Form.Control type="text" placeholder="Start Date (DD/MM/YY)" onChange={e => setStartDate(e.target.value)} />
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
                        {/* <Form.Group className="row_align" as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                Maximum players
                            </Form.Label>
                            <Col lg="10">
                            <Form.Control type="number" placeholder="Players" onChange={e => setPlayers(e.target.value)}/>
                            </Col>
                        </Form.Group> */}

                        <div className="create_tournament_checkboxes">
                            <h5>Matches In The Tournament</h5>
                            {['checkbox'].map((type) => (
                                <div key={`custom-inline-${type}`} className="mb-3 ct-checkbox">
                                    <Form.Check
                                        custom
                                        inline
                                        value="Men's singles"
                                        label="Men's singles"
                                        type={type}
                                        id={`custom-inline-${type}-1`}
                                    />
                                </div>
                            ))}
                            {['checkbox'].map((type) => (
                                <div key={`custom-inline-${type}`} className="mb-3 ct-checkbox">
                                    <Form.Check
                                        custom
                                        inline
                                        value="Women's singles"
                                        label="Women's singles"
                                        type={type}
                                        id={`custom-inline-${type}-2`}
                                    />
                                </div>
                            ))}
                            {['checkbox'].map((type) => (
                                <div key={`custom-inline-${type}`} className="mb-3 ct-checkbox">
                                    <Form.Check
                                        custom
                                        inline
                                        value="Men's doubles"
                                        label="Men's doubles"
                                        type={type}
                                        id={`custom-inline-${type}-3`}
                                    />
                                </div>
                            ))}
                            {['checkbox'].map((type) => (
                                <div key={`custom-inline-${type}`} className="mb-3 ct-checkbox">
                                    <Form.Check
                                        custom
                                        inline
                                        value="Women's doubles"
                                        label="Women's doubles"
                                        type={type}
                                        id={`custom-inline-${type}-4`}
                                    />
                                </div>
                            ))}
                            {['checkbox'].map((type) => (
                                <div key={`custom-inline-${type}`} className="mb-3 ct-checkbox">
                                    <Form.Check
                                        custom
                                        inline
                                        value="Mixed doubles"
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
