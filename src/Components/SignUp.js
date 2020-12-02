import React, { useState, useEffect } from 'react'
import "../Styles/SignUp.scss"
import { Form, Button } from "react-bootstrap"
import axios from "axios"
import { useHistory } from "react-router";
import sgmail from "@sendgrid/mail"

function SignUp(props) {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password1, setPassword1] = useState("")
    const history = useHistory();

    const postIt = (e) => {
        e.preventDefault()
        console.log(e)
        //Blank Entries
        if (username === "" || email === "" || password === "" || password1 === "") {
            alert("Please fill all entries.")
            return
        }

        //Validate Email
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!email.match(mailformat)) {
            alert("You have entered an invalid email address!");
            return;
        }

        //Validate Password
        if (password != password1) {
            alert("Passwords do not match.")
            return
        }

        // postData
        axios.post(
            "http://139.59.16.180:8269/admin/register",
            {
                data: {
                    "name": username,
                    "email": email,
                    "password": password
                }
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                if (err == "Error: Request failed with status code 500") {
                    document.getElementById("error_message2").innerHTML = "<p >Invalid value(s)</p>"
                }
                else if (err == "Error: Request failed with status code 400") {
                    document.getElementById("error_message3").innerHTML = "<p>User Already exist.</p>"
                }
                else {
                    document.getElementById("error_message4").innerHTML = "<p>Something went wrong</p>"
                }
                alert("Error")
                history.push("/signup")
            });

        // sendOtp
        const otp = Math.floor(Math.random() * 9000 + 1000)
        localStorage.setItem("otp", otp)
        const API_KEY = "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"
        sgmail.setApiKey(API_KEY)
        const message = {
            to: email,
            from: "13sjain4ur7@gmail.com",
            subject: `OTP for TTWebApp`,
            text: `OTP: ${otp} for TTWebApp`,
            html: `<h1>OTP: ${otp} for TTWebApp</h1>`
        }
        sgmail.send(message)
            .then(res => {
                alert("Otp sent. Check your Email.")
                localStorage.setItem("enableOtpScreen", true)
                history.push("/otp")
            })
            .catch(err => {
                alert(err.message)
                return
            })

    }

    return (
        <div className="signup">
            <div className="signup_heading">
                <h1>SignUp</h1>
            </div>
            <div className="signup_form">
                <Form onSubmit={postIt}>
                    <div className="error_message" id="error_message1" ></div>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Control required type="text" placeholder="Enter Name" onChange={event => setUsername(event.target.value)} />
                    </Form.Group>
                    <div className="error_message" id="error_message2" ></div>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" onChange={event => setEmail(event.target.value)} />
                    </Form.Group>
                    <div className="error_message" id="error_message3" ></div>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" onChange={event => setPassword(event.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" onChange={event => setPassword1(event.target.value)} />
                    </Form.Group>
                    <div className="error_message" id="error_message4" ></div>
                    <Button variant="primary" type="submit" >Submit</Button>
                </Form>
            </div>
            <div className="reg_footer_note">
                <p>Already have an account? <a href="/Login">LogIn</a></p>
            </div>
        </div>
    )
}

export default SignUp
