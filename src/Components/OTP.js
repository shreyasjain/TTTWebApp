import "../Styles/OTP.scss"
import { Button } from 'react-bootstrap'
import React, { useState } from "react";
import { useHistory } from "react-router";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import { Modal } from "react-bootstrap"
import { Link, Redirect } from "react-router-dom";

function OTP() {
    const history = useHistory();

    // if (!localStorage.getItem("enableOtpScreen")) { 
    //     // history.push("/")
    //     window.location.href="/"

    //     // <Link to="/signup" />

    // }
    const [otp, setOtp] = useState("")
    const [modalShow1, setModalShow1] = useState(false)
    const [modalShow2, setModalShow2] = useState(false)

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
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
    // setModalShow1(true)
    const onSubmitOtp = (e) => {
        e.preventDefault()
        const savedOtp = localStorage.getItem("otp")
        if (otp === savedOtp) {


            // postData
            Axios.post(
                "http://139.59.16.180:8269/admin/register",
                {
                    data: {
                        "name": localStorage.getItem("signUpName"),
                        "email": localStorage.getItem("signUpEmail"),
                        "password": localStorage.getItem("signUpPassword")
                    }
                })
                .then(res => {
                    console.log(res)
                    // alert("Otp verified and Registered Successfully.")
                    if (res.data.message === "register successfull!") {
                        setModalShow1(true)

                    }
                    else if (res.data.message === "Already Registered with this email, try login") {
                        document.getElementById("error_message1").innerHTML = "<p >User Already registered.</p>"
                    }
                })
                .catch(err => {
                    document.getElementById("error_message1").innerHTML = "<p >Something went wrong.</p>"
                });

            localStorage.removeItem("enableOtpScreen")

            // history.push("/login")
        }
        else {
            setModalShow2(true)
            return
        }
    }

    if(localStorage.getItem("token")){
        return <Redirect to="/myProfile" />
    }

    return (
        <div>
            <div className="otp">
                <div className="otp_heading">
                    <h1> Enter OTP</h1>
                </div>
                <Form className="otp_form" >
                    <Form.Group>
                        <Form.Control id="otp" type="number" name="otp" placeholder="OTP" onChange={e => setOtp(e.target.value)} />
                    </Form.Group>
                    <div className="error_message" id="error_message1" ></div>

                    <Button variant="primary" type="submit"
                        onClick={e => onSubmitOtp(e)}>Validate OTP</Button>

                    {/* <Button variant="outline-primary" className="otp-resend-btn"
                        onClick={e => onSubmitOtp(e)}>Didn't recieve mail? Resend OTP</Button> */}
                </Form>
                <MyVerticallyCenteredModal
                    message="Otp verified! Registered Successfully."
                    show={modalShow1}
                    onHide={() => { setModalShow1(false); history.push("/login"); }}
                />
                <MyVerticallyCenteredModal
                    message="Incorrect otp."
                    show={modalShow2}
                    onHide={() => setModalShow2(false)}
                />
            </div>
        </div>
    )
}

export default OTP