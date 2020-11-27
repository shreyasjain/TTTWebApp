import "../Styles/OTP.scss"
import { Button } from 'react-bootstrap'
import React, { useState } from "react";
import { useHistory } from "react-router";
import Form from "react-bootstrap/Form";

function OTP() {
    const history = useHistory();
    if(!localStorage.getItem("enableOtpScreen")){history.push("/")}
    const [otp, setOtp] = useState("")
    const onSubmitOtp = (e) => {
        e.preventDefault()
        const savedOtp = localStorage.getItem("otp")
        if (otp === savedOtp) {
            alert("Otp verified. LogIn now.")
            history.push("/login")
        }
        else {
            alert("OTP not verified.")
            return
        }
    }

    return (
        <div>
            <div className="otp">
                <div className="otp_heading">
                    <h1> Enter OTP</h1>
                </div>
                <Form className="form" >
                    <Form.Group>
                        <Form.Control id="otp" type="number" name="otp" placeholder="OTP" onChange={e => setOtp(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ marginLeft: "20%" }}
                        onClick={e => onSubmitOtp(e)}>Validate OTP</Button>
                </Form>
            </div>
        </div>
    )
}

export default OTP