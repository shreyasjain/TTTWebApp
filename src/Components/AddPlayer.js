import React, { useState } from 'react'
import "../Styles/AddPlayer.scss"
import { Button, Form, Row, Col } from 'react-bootstrap'
import Axios from 'axios'
import { useHistory } from "react-router-dom"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function AddPlayer() {

    const history = useHistory()
    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [gender, setGender] = useState("")
    const [age, setAge] = useState("")
    
    const backClicked = (e) => {
        e.preventDefault()
        history.push("/players")
    }
    
    const submitAddPlayer = (e) => {
        e.preventDefault()
        console.log(gender)

        //Blank Entries
        if (name === "" || email === "" || gender === "" || age === "") {
            alert("Please fill all entries.")
            return
        }

        //Validate Email
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!email.match(mailformat)) {
            alert("You have entered an invalid email address!");
            return;
        }

        var formData = new FormData()
        formData.append("file", image);
        const theWrapper = {
            "data": {
                "name": name,
                "age": age,
                "email": email,
                "gender": gender
            }
        }

        formData.append("theWrapper", JSON.stringify(theWrapper))

        // console.log(formData)

        Axios.post("http://139.59.16.180:8269/player/add",
            formData,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        ).then(res => {
            console.log(res)
            alert("Player added successfully.")
            history.push("/players")
        })
            .catch(err => alert(err.messge))
    }

    return (
        <div className="addPlayer">
            <div className="addPlayers_heading">
            <button id="back-button" onClick={e => backClicked(e)}><ArrowBackIcon /></button>
                <strong>Add Player</strong>
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
                        <label htmlFor="file-upload" className="custom-file-upload">
                            <i className="fa fa-cloud-upload"></i> Add image
                        </label>
                        <input type="file" id="file-upload"
                            onChange={e => setImage(e.target.files[0])}
                        />
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Enter name" onChange={e => { setName(e.target.value) }} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter email" onChange={e => { setEmail(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="row_align" as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Gender
                            </Form.Label>
                            <Col lg="10">
                                <Form.Control as="select" onChange={e => { setGender(e.target.value) }} defaultValue="Choose...">
                                    <option value="" >Choose...</option>
                                    <option value="Male" >Male</option>
                                    <option value="Female" >Female</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group className="row_align" as={Row} controlId="formHorizontalEmail">
                            <Col lg={1}>
                                <Form.Control type="number" placeholder="age" onChange={e => { setAge(e.target.value) }} />
                            </Col>
                            <Form.Label column sm={3}>
                                years old
                            </Form.Label>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={e => submitAddPlayer(e)}>Submit</Button>
                    </Form>
                </div>
            </div>

        </div>
    )
}

export default AddPlayer
