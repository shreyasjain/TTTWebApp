import React, { useState, useEffect } from 'react'
import "../Styles/CreateTournament.scss"
import { Button, Form, Row, Col, Modal } from 'react-bootstrap'
import Axios from 'axios'
import { useHistory } from "react-router-dom"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function UpdateTournament() {

    const id = localStorage.getItem("idToUpdate")
    const history = useHistory()
    // if(!localStorage.getItem("token")){
    //     history.push("/")
    // }
    const [currentData, setCurrentData] = useState("")
    const [name, setName] = useState("")
    const [startDate, setStartDate] = useState("")
    const [regEndDate, setRegEndDate] = useState("")
    const [maxScore, setMaxScore] = useState("")
    const [image, setImage] = useState("")
    const [endDate, setEndDate] = useState("")
    const [modalShow1, setModalShow1] = useState(false)
    // const [imageUrl, setImageUrl] = useState()

    useEffect(() => {
        Axios.get(`http://139.59.16.180:8269/tournament/details/${id}`,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            .then(res => {
                setCurrentData(res.data.data)
                console.log(res.data.data)
                setName(res.data.data.name)
                setStartDate(res.data.data.startDate)
                setRegEndDate(res.data.data.registrationLastDate)
                setMaxScore(res.data.data.maxSetScore)
                setEndDate(res.data.data.endDate)
            })
            .catch(err => console.log(err))
    }, [])

    if (id === null) { history.push("/tournaments") }

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

    const backClicked = (e) => {
        e.preventDefault()
        history.push("/tournaments")
    }

    const updateClicked = (e => {
        e.preventDefault()

        console.log(image)

        //Set Matches Array
        let matches = []
        let checkboxes = document.getElementsByClassName("ct-checkbox")
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                matches.push(checkboxes[i].value)
            }
        }
        console.log(matches)

        //Blank Entries
        if (name === "" || startDate === "" || regEndDate === "" || maxScore === "" || image === "") {
            document.getElementById("error_message1").innerHTML = "<p >All fields are required.</p>"
            return
        }

        var formData = new FormData()
        formData.append("file", image);

        console.log(image)

        const tournamentDetails = {
            "name": name,
            "startDate": startDate,
            "registrationLastDate": regEndDate,
            "maxSetScore": maxScore,
            "matchType": matches,
            "status": "upcoming",
            "createdDate": 1605605229000,
            "modifiedDate": 1605605229000,
            "endDate": endDate,
            "players": [
                "1",
                "2",
                "3"]
        }

        formData.append("tournamentDetails", JSON.stringify(tournamentDetails))

        // Axios.post("http://139.59.16.180:8269/tournament/create",
        //     formData,
        //     { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        // ).then(res => {
        //     console.log(res)
        //     alert("Tournament updated successfully")
        //      localS
        //     history.push("/tournaments")
        // })
        //     .catch(err => { alert(err.message) })

        Axios.put(`http://139.59.16.180:8269/tournament/update/${id}`,
            formData,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        ).then(res => {
            console.log(res)
            // alert("Tournament updated successfully")
            setModalShow1(true)
            localStorage.removeItem("idToUpdate")

        })
            .catch(err => { document.getElementById("error_message1").innerHTML = "<p >Something went wrong.</p>" })
    })



    return (
        <div className="create-tournament">
            <div className="create_tournament_heading">
                <button id="back-button" onClick={e => backClicked(e)}><ArrowBackIcon /></button>
                <strong>Update</strong>
                <div></div>
            </div>
            <div className="myProfile_dp">
                <div className="myProfile_pic">
                    <img src={require('../Media/dummy_dp.png')} alt="profile pic" />
                </div>
            </div>
            <div className="addPlayer_form">
                <div className="addPlayer_form_contents">
                    <Form>
                        <div className="error_message" id="error_message1" ></div>
                        <label htmlFor="file-upload" className="custom-file-upload">
                            <i className="fa fa-cloud-upload"></i> Add image
                        </label>
                        <input type="file" id="file-upload"
                            onChange={e => setImage(e.target.files[0])}
                        />
                        <Form.Group controlId="formBasicText">
                            <Form.Control type="text" value={name} placeholder="Tournament Name" onChange={e => setName(e.target.value)} />
                        </Form.Group>
                        <div className="ct-labels"><label>Start Date:</label></div>
                        <Form.Group controlId="formBasicText">
                            <Form.Control type="date" value={currentData != "" ? startDate.substring(0, 10) : ""} placeholder="Start Date (DD/MM/YY)" onChange={e => setStartDate(e.target.value)} />
                        </Form.Group>
                        <div className="ct-labels"><label>End Date:</label></div>
                        <Form.Group controlId="formBasicText">
                            <Form.Control type="date" value={currentData != "" ? endDate.substring(0, 10) : ""} placeholder="End Date (DD/MM/YY)" onChange={e => setEndDate(e.target.value)} />
                        </Form.Group>
                        <div className="ct-labels"><label>Registration End Date:</label></div>
                        <Form.Group controlId="formBasicText">
                            <Form.Control type="date" value={currentData != "" ? regEndDate.substring(0, 10) : ""} placeholder="Registration End Date" onChange={e => setRegEndDate(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="row_align" as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                                Max score per set
                            </Form.Label>
                            <Col lg="10">
                                <Form.Control type="number" value={maxScore} placeholder="Max score" onChange={e => setMaxScore(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <div className="create_tournament_checkboxes">
                            <h5>Matches In The Tournament</h5>
                            <label className="container ut-checkboxes">
                                <input type="checkbox" className=" ct-checkbox" value="Men's Singles" />
                                {/* <span class="checkmark"></span> */}
                                Men's Singles
                        </label>

                            <label className="container ut-checkboxes">
                                <input type="checkbox" className=" ct-checkbox" value="Women's Singles" />
                                {/* <span class="checkmark"></span> */}
                                Women's Singles
                        </label>

                            <label className="container ut-checkboxes">
                                <input type="checkbox" className=" ct-checkbox" value="Men's Doubles" />
                                {/* <span class="checkmark"></span> */}
                                Men's Doubles
                        </label>

                            <label className="container ut-checkboxes">
                                <input type="checkbox" className=" ct-checkbox" value="Women's Doubles" />
                                {/* <span class="checkmark"></span> */}
                                Women's Doubles
                        </label>

                            <label className="container ut-checkboxes">
                                <input type="checkbox" className=" ct-checkbox" value="Mixed Doubles" />
                                {/* <span class="checkmark"></span> */}

                                Mixed Doubles
                        </label>
                        </div>
                        <Button variant="primary" type="submit" onClick={e => updateClicked(e)}>Save</Button>
                    </Form>
                    <MyVerticallyCenteredModal
                        message="Player Updated Successfully."
                        show={modalShow1}
                        onHide={() => { setModalShow1(false); history.push("/tournaments"); }}
                    />
                </div>
            </div>
        </div>
    )
}

export default UpdateTournament
