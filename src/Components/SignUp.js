import React, { useState, useEffect } from 'react'
import "../Styles/SignUp.scss"
import { Form, Button } from "react-bootstrap"
import axios from "axios"
import { useHistory } from "react-router";
import sgmail from "@sendgrid/mail"
import { Link, Redirect } from "react-router-dom"

function SignUp(props) {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password1, setPassword1] = useState("")
    const [error, isError] = useState()
    const history = useHistory();

    useEffect(() => {
        const messages = document.getElementsByClassName("error_message")
        for (let i = 0; i < messages.length; i++) {
            messages[i].innerHTML = "<p></p>"
        }
    }, [username, email, password, password1])

    useEffect(() => {
        var lowerCaseLetters = /[a-z]/g;
        var upperCaseLetters = /[A-Z]/g;
        var numbers = /[0-9]/g;

        if (password.length == 0) {
            return
        }
        else if (!password.match(lowerCaseLetters) || !password.match(upperCaseLetters) || !password.match(numbers) || password.length < 8) {

            document.getElementById("error_message5").innerHTML = "<p >Use Uppercase, lowerCase and number.</p>"
            return
        }
    }, [password])

    useEffect(() => {
        if (username.length == 0) {
            return
        }
        var letters = /^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$/;
        if (!username.match(letters)) {
            document.getElementById("error_message2").innerHTML = "<p>Please enter valid name.</p>"
            return
        }
    }, [username])

    useEffect(() => {
        if (password1.length == 0) {
            return
        }
        // else if (password1.length >= password.length) {
            if (password != password1) {
                document.getElementById("error_message4").innerHTML = "<p >Passwords do not match.</p>"
                return
            }
        // }
    }, [password1])



    const postIt = (e) => {
        e.preventDefault()
        console.log(e)

        var lowerCaseLetters = /[a-z]/g;
        var upperCaseLetters = /[A-Z]/g;
        var numbers = /[0-9]/g;

        if (password.length == 0) {
            return
        }
        else if (!password.match(lowerCaseLetters) || !password.match(upperCaseLetters) || !password.match(numbers) || password.length < 8) {

            document.getElementById("error_message5").innerHTML = "<p >Use Uppercase, lowerCase and number.</p>"
            return
        }
        if (username.length == 0) {
            return
        }
        var letters = /^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$/;
        if (!username.match(letters)) {
            document.getElementById("error_message2").innerHTML = "<p>Please enter valid name.</p>"
            return
        }
        if (password1.length == 0) {
            return
        }
        else if (password != password1) {
            document.getElementById("error_message4").innerHTML = "<p >Passwords do not match.</p>"
            return
        }


        console.log("approved")


        //save data
        localStorage.setItem("signUpName", username)
        localStorage.setItem("signUpEmail", email)
        localStorage.setItem("signUpPassword", password)

        // sendOtp
        const otp = Math.floor(Math.random() * 9000 + 1000)
        localStorage.setItem("otp", otp)
        const API_KEY = "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"
        sgmail.setApiKey(API_KEY)
        const message = {
            to: email,
            from: "shreyas.jain@aurigait.com",
            subject: `OTP for TTWebApp`,
            text: `OTP: ${otp} for TTWebApp`,
            html: `<h1>OTP: ${otp} for TTWebApp</h1>`
        }
        sgmail.send(message)
            .then(res => {
                // alert("Otp sent. Check your Email.")
                localStorage.setItem("enableOtpScreen", true)
                history.push("/otp")
            })
            .catch(err => {
                // alert(err.message)
                console.log(err.message)

            })

    }

    if (localStorage.getItem("token")) {
        return <Redirect to="/myProfile" />
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
                        <Form.Control required type="email" placeholder="Enter email" onChange={event => setEmail(event.target.value)} />
                    </Form.Group>
                    <div className="error_message" id="error_message3" ></div>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control required type="password" placeholder="Password" onChange={event => setPassword(event.target.value)} />
                    </Form.Group>
                    <div className="error_message" id="error_message5" ></div>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control required type="password" placeholder="Confirm Password" onChange={event => setPassword1(event.target.value)} />
                    </Form.Group>
                    <div className="error_message" id="error_message4" ></div>
                    <Button variant="primary" type="submit" id="submit-signup">Submit</Button>

                </Form>
            </div>
            <div className="reg_footer_note">
                <p>Already have an account? <Link to="/login">LogIn</Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp
