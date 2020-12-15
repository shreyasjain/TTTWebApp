import React, { useState } from 'react'
import "../Styles/AddPlayer.scss"
import { Button, Form, Row, Col, Modal } from 'react-bootstrap'
import Axios from 'axios'
import { useHistory } from "react-router-dom"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


function AddPlayer() {

    const history = useHistory()
    const [displayPic,setDisplayPic] = useState(require("../Media/dummy_dp.png"))
    const [image, setImage] = useState(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [gender, setGender] = useState("")
    const [age, setAge] = useState("")
    const [modalShow1,setModalShow1] = useState(false)
    
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

    // if (!localStorage.getItem("token")) {
    //     history.push("/")
    // }

    const backClicked = (e) => {
        e.preventDefault()
        history.push("/players")
        
    }

    const submitAddPlayer = (e) => {
        e.preventDefault()
        console.log(gender)

        //Blank Entries
        if (name === "" || email === "" || gender === "" || age === "") {
            // alert("Please fill all entries.")
            document.getElementById("error_message1").innerHTML="<p>Please fill all entries.</p>"
            return
        }

        //Validate Email
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!email.match(mailformat)) {
            // alert("You have entered an invalid email address!");
            document.getElementById("error_message2").innerHTML="<p>You have entered an invalid email address!</p>"
            
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
            setModalShow1(true)
            
        })
            .catch(err => document.getElementById("error_message1").innerHTML="<p>Something went wrong!</p>"
            )
    }

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
        <div className="addPlayer">
            <div className="addPlayers_heading">
                <button id="back-button" onClick={e => backClicked(e)}><ArrowBackIcon /></button>
                <strong>Add Player</strong>
                <div></div>
            </div>
            <div className="myProfile_dp">
                <div className="myProfile_pic">
                    <img src={displayPic} alt="profile pic" />
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
                        <input type="file" id="file-upload"
                            onChange={e => handlePhoto(e)}
                        />
                         <div className="error_message" id="error_message2" ></div>
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
                    <MyVerticallyCenteredModal
                        heading=""
                        message="Player Added Successfully."
                        show={modalShow1}
                        onHide={() => {setModalShow1(false); history.push("/players");}}
                    />
                </div>
            </div>

        </div>
    )
}

export default AddPlayer
