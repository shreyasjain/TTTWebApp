import React, { useState } from 'react'
import "../Styles/CreateTournament.scss"
import { Button, Form, Row, Col, Modal } from 'react-bootstrap'
import Axios from 'axios'
import { useHistory } from "react-router-dom"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function CreateTournament() {
    
    const history = useHistory()
    // if(!localStorage.getItem("token")){
    //     history.push("/")
    // }
    const [name, setName] = useState("")
    const [startDate, setStartDate] = useState("")
    const [regEndDate, setRegEndDate] = useState("")
    const [maxScore, setMaxScore] = useState("")
    const [displayPic,setDisplayPic] = useState(require("../Media/dummy_dp.png"))
    const [image, setImage] = useState(null)
    const [modalShow1,setModalShow1] = useState(false)
    const [endDate,setEndDate] = useState("")
    
    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
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

    // if(1<2){setModalShow1(true)}

    const backClicked = (e) => {
        e.preventDefault()
        history.push("/tournaments")
    }

    const createClicked = (e => {
        e.preventDefault()

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
            // alert("Please fill all entries.")
            document.getElementById("error_message1").innerHTML="<p>Please fill all entries.</p>"
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
                "endDate":endDate
            }
        }

        formData.append("theWrapper", JSON.stringify(theWrapper))

        Axios.post("http://139.59.16.180:8269/tournament/create",
            formData,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        ).then(res => {
            console.log(res)
            setModalShow1(true)
            
        })
            .catch(err => { document.getElementById("error_message1").innerHTML="<p>Something went wrong.</p>" })
    })

const handlePhoto = (e)=>{
    e.preventDefault()
    const reader = new FileReader();
        reader.onload=()=>{
            if(reader.readyState===2){
                console.log('here')
                setDisplayPic(reader.result)
                console.log(reader.result)
            }
        }
        reader.readAsDataURL(e.currentTarget.files[0])
       
        console.log("here in photo Change")
        console.log(e.currentTarget.files[0])
        setImage(e.currentTarget.files[0])
        console.log("obj=",URL.createObjectURL(e.currentTarget.files[0]))
}

    return (
        <div className="create-tournament">
            <div className="create_tournament_heading">
                <button id="back-button" onClick={e => backClicked(e)}><ArrowBackIcon /></button>
                <strong>Create</strong>
                <div></div>
            </div>
            <div className="myProfile_dp">
                <div className="myProfile_pic">
                    <img src={displayPic} alt="profile pic" />
                </div>
            </div>
            <div className="addPlayer_form">
                <div className="addPlayer_form_contents">
                    <Form>
                        <label htmlFor="file-upload" className="custom-file-upload">
                            <i className="fa fa-cloud-upload"></i> Add image
                        </label>
                        <input type="file" id="file-upload"
                            onChange={e => {
                                // setImage(`require(${e.target.files[0]})`);
                        handlePhoto(e)
                        }}
                        />
                        <div className="error_message" id="error_message1" ></div>
                        <Form.Group controlId="formBasicText">
                            <Form.Control type="text" placeholder="Tournament Name" onChange={e => setName(e.target.value)} />
                        </Form.Group>
                        <div className="ct-labels"><label>Start Date:</label></div>
                        <Form.Group controlId="formBasicText">
                            <Form.Control type="date" placeholder="Start Date" onChange={e => setStartDate(e.target.value)} />
                        </Form.Group>
                        <div className="ct-labels"><label>End Date:</label></div>
                        <Form.Group controlId="formBasicText">
                            <Form.Control type="date" placeholder="Start Date" onChange={e => setEndDate(e.target.value)} />
                        </Form.Group>
                        <div className="ct-labels"><label>Registration End Date:</label></div>
                        <Form.Group controlId="formBasicText">
                            <Form.Control type="date" placeholder="Registration End Date" onChange={e => setRegEndDate(e.target.value)} />
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
                            <label className="container123">
                                <input type="checkbox" className=" ct-checkbox" value="Men's Singles" />
                                <span class="checkmark"></span>
                                Men's Singles
                        </label>

                            <label className="container123">
                                <input type="checkbox" className=" ct-checkbox" value="Women's Singles" />
                                <span class="checkmark"></span>
                                Women's Singles
                        </label>

                            <label className="container123">
                                <input type="checkbox" className=" ct-checkbox" value="Men's Doubles" />
                                <span class="checkmark"></span>
                                Men's Doubles
                        </label>

                            <label className="container123">
                                <input type="checkbox" className=" ct-checkbox" value="Women's Doubles" />
                                <span class="checkmark"></span>
                                Women's Doubles
                        </label>

                            <label className="container123">
                                <input type="checkbox" className=" ct-checkbox" value="Mixed Doubles" />
                                <span class="checkmark"></span>
                              
                                Mixed Doubles
                        </label>
                        </div>
                       
                        <Button variant="primary" type="submit" onClick={e => createClicked(e)}>Save</Button>
                    </Form>
                    <MyVerticallyCenteredModal
                        message="Tournament Created Successfully."
                        show={modalShow1}
                        onHide={() => {setModalShow1(false);history.push("/tournaments");}}
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateTournament
