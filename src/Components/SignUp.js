import React from 'react'
import "../Styles/SignUp.scss"
import { Form, Button } from "react-bootstrap"

function SignUp() {
    return (
        <div className="signup">
            <div className="signup_heading">
                <strong>SignUp</strong>
            </div>
            <div className="signup_form">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </div>
            <div className="reg_footer_note">
                <p>Already have an account? <a href="/Login">LogIn</a></p>
            </div>
        </div>
    )
}

export default SignUp
