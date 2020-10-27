import React from 'react'
import "../Styles/OTP.scss"
import { Form, Button } from 'react-bootstrap'

function OTP() {
    return (
        <div className="otp">
            <div className="otp_heading">
                <h1> Enter OTP</h1>
            </div>
            <div className="otp_form">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="number" placeholder="Enter OTP here" />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </div>
        </div>
    )
}

export default OTP
