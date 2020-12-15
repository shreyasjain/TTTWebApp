import React, { useState, useEffect } from 'react'
import "../Styles/AddPlayer.scss"
import { Button, Form, Row, Col, Modal } from 'react-bootstrap'
import Axios from 'axios'
import { useHistory } from "react-router-dom"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function UpdatePlayer() {

    const history = useHistory()
    // if (!localStorage.getItem("token")) {
    //     history.push("/")
    // }
    const id = localStorage.getItem("playerToUpdate")
    if (id === null) { history.push("/players") }
    const [currentData, setCurrentData] = useState("")
    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [gender, setGender] = useState("")
    const [age, setAge] = useState("")
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

    useEffect(() => {
        Axios.get(`http://139.59.16.180:8269/player/details/${id}`,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })
            .then(res => {
                console.log(res.data.data)
                setCurrentData(res.data.data)
                // setImage(res.data.data.)
                setName(res.data.data.name)
                setEmail(res.data.data.email)
                setGender(res.data.data.gender)
                setAge(res.data.data.age)
            })
            .catch(err => console.log(err))
    }, [])

    const backClicked = (e) => {
        e.preventDefault()
        history.push("/players")
    }

    const submitAddPlayer = (e) => {
        e.preventDefault()
        console.log(gender)

        //Blank Entries
        if (name === "" || email === "" || gender === "" || age === "") {
            document.getElementById("error_message1").innerHTML = "<p >Please fill all entries.</p>"
            return
        }

        //Validate Email
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!email.match(mailformat)) {
            // alert("You have entered an invalid email address!");
            document.getElementById("error_message1").innerHTML = "<p >Invalid Email address.</p>"
            return;
        }

        var formData = new FormData()
        formData.append("file", image);

        const playerDetails = {
            "name": name,
            "email": email,
            "gender": gender,
            // "imageUrl": "D:\\Backup Project\\TTTournament\\images\\players\\abc.png",
            "createdDate": "2020-11-25T08:51:47.000+00:00",
            "modifiedDate": "2020-11-25T08:51:47.000+00:00",
            "age": age,
            "matchPlayed": 0,
            "wonMatches": 0
        }

        formData.append("playerDetails", JSON.stringify(playerDetails))

        Axios.put(`http://139.59.16.180:8269/player/update/${id}`,
            formData,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        ).then(res => {
            console.log(res)
            // alert("Player updated successfully.")

            setModalShow1(true)
            localStorage.removeItem("playerToUpdate")
            
        })
            .catch(err => document.getElementById("error_message1").innerHTML = "<p >Something went wrong.</p>")
    }

    return (
        <div className="addPlayer">
            <div className="addPlayers_heading">
                <button id="back-button" onClick={e => backClicked(e)}><ArrowBackIcon /></button>
                <strong>Update</strong>
                <div></div>
            </div>
            <div className="myProfile_dp">
                <div className="myProfile_pic">
                    <img src={require("../Media/dummy_dp.png")} alt="profile pic" />
                </div>

                {/* <a href="http://www.google.com">Add image</a> */}
            </div>
            <div className="addPlayer_form">
                <div className="addPlayer_form_contents">
                    <Form>
                        <div className="error_message" id="error_message1" ></div>
                        <label htmlFor="file-upload" className="custom-file-upload">
                            <i className="fa fa-cloud-upload"></i> Add image
                        </label>
                        <input type="file" fileName={currentData.imageUrl} id="file-upload"
                            onChange={e => setImage(e.target.files[0])}
                        />
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="text" value={name} placeholder="Enter name" onChange={e => { setName(e.target.value) }} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="email" value={email} placeholder="Enter email" onChange={e => { setEmail(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="row_align" as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Gender
                            </Form.Label>
                            <Col lg="10">
                                <Form.Control as="select" onChange={e => { setGender(e.target.value) }} defaultValue={gender}>
                                    {/* <option value="" >Choose...</option> */}
                                    <option value="Male" selected={gender == "Male" ? true : false}>Male</option>
                                    <option value="Female" >Female</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group className="row_align" as={Row} controlId="formHorizontalEmail">
                            <Col lg={1}>
                                <Form.Control type="number" value={age} placeholder="age" onChange={e => { setAge(e.target.value) }} />
                            </Col>
                            <Form.Label column sm={3}>
                                years old
                            </Form.Label>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={e => submitAddPlayer(e)}>Submit</Button>
                    </Form>
                    <MyVerticallyCenteredModal
                        message="Player Updated Successfully."
                        show={modalShow1}
                        onHide={() => {setModalShow1(false);history.push("/players");}}
                    />
                </div>
            </div>

        </div>
    )
}

export default UpdatePlayer
