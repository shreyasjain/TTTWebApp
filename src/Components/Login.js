import React, { useState } from 'react'
import "../Styles/Login.scss"
import { Form, Button } from 'react-bootstrap'
import axios from "axios"
import {useHistory} from "react-router-dom"

function Login() {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const history = useHistory();

    const loginButton = (e) => {
        axios.post("http://139.59.16.180:8269/admin/login",
        {"email":email, "password":password}
        // {headers:{Authorization:"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJydXNtZWVua2hhbjFAZ21haWwuY29tIiwiZXhwIjoxNjA0NjYzMzk2LCJpYXQiOjE2MDQ2NDUzOTZ9.yTuc7dnK3DvEUYb2vyjCkUxwLH2xbAFpffnw-gG7WdyBwYzquDbs2_TTn-e3-OA7rWOrCM9s4hZ30EnrbHKjqA"}}
        )
        .then(res => 
            {console.log(res)
            localStorage.setItem("token",res.data.token)
            history.push("/tournaments")
        })
        .catch(err => {
            if(err == "Error: Request failed with status code 401"){
                document.getElementById("error_message").innerHTML="<p>Invalid id-password. Try again.</p>"
            }
        })
    }

    return (
        <div className="login">
            <div className="login_heading">
                <h1>Login</h1>
            </div>
            <div className="login_form">
            <Form>
                <div id="error_message"></div>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Email ID" onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <div className="login_button">
                <Button variant="primary" type="button" onClick={e => loginButton(e)} >Submit</Button>
                </div>
            </Form>
            </div>
            <div className="login_footer_note">
                <p>New here? <a href="/signup">SignUp</a></p>
            </div>
        </div>
    )
}

export default Login
