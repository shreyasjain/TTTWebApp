import React, { useState, useEffect } from 'react'
import "../Styles/SignUp.scss"
import { Form, Button } from "react-bootstrap"
import axios from "axios"
import { useHistory } from "react-router";
import {Redirect,Link} from "react-router-dom"

function SignUp(props) {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory();

    const postIt = (e) => {
        e.preventDefault()
        
        axios.post(
            "http://139.59.16.180:8269/admin/register", 
        {
            "name": username,
            "email": email,
            "password": password
        })
        .then(res => {
            console.log(res)
            history.push("/login")
        })
        .catch(err => {
        if(err == "Error: Request failed with status code 500"){
            document.getElementById("error_message2").innerHTML="<p >Invalid value(s)</p>"
        }
        else if (err == "Error: Request failed with status code 400"){
            document.getElementById("error_message3").innerHTML="<p>User Already exist.</p>"
        }
        else{
        document.getElementById("error_message4").innerHTML="<p>Something went wrong</p>"}
    });

        
    }

    return (
        <div className="signup">
            <div className="signup_heading">
                <h1>SignUp</h1>
            </div>
            <div className="signup_form">
                <Form>
                    <div className="error_message" id="error_message1" ></div>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Control type="text" placeholder="Enter Name" onChange={event => setUsername(event.target.value)} />
                    </Form.Group>
                    <div className="error_message" id="error_message2" ></div>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" onChange={event => setEmail(event.target.value)} />
                    </Form.Group>
                    <div className="error_message" id="error_message3" ></div>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" onChange={event => setPassword(event.target.value)} />
                    </Form.Group>
                    <div className="error_message" id="error_message4" ></div>
                    <Button variant="primary" type="submit" onClick={(e) => postIt(e)}>Submit</Button>
                </Form>
            </div>
            <div className="reg_footer_note">
                <p>Already have an account? <a href="/Login">LogIn</a></p>
            </div>
        </div>
    )
}

export default SignUp
