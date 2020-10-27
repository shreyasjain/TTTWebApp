import React from 'react'
import "../Styles/Login.scss"
import { Form, Button } from 'react-bootstrap'
import axios from "axios"

function Login() {

    const getIt = (e)=>{
        e.preventDefault()
        console.log("Get It Called.")
        axios.get("https://jsonplaceholder.typicode.com/users/")
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }

    return (
        <div className="login">
            <div className="login_heading">
                <h1>Login</h1>
            </div>
            <div className="login_form">
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Email ID" />
                </Form.Group>
                <div className="login_button">
                <Button variant="primary" type="button" onClick={(e)=>getIt(e)}>Submit</Button>
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
