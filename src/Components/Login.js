import React, { useState, useEffect } from 'react'
import "../Styles/Login.scss"
import { Form, Button, Modal } from 'react-bootstrap'
import axios from "axios"
import {useHistory, Link, Redirect} from "react-router-dom"
import VisibilityIcon from '@material-ui/icons/Visibility';


function Login() {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const history = useHistory();

   
    useEffect(() => {
        const messages = document.getElementsByClassName("error_message")
        for (let i = 0; i < messages.length; i++) {
            messages[i].innerHTML = "<p></p>"
        }
    },[email,password])

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
    const [modalShow1,setModalShow1] = useState(false)

    const loginButton = (e) => {

        //Blank Entries
        if (email === "" || password === "") {
            document.getElementById("error_message2").innerHTML = "<p >All fields are required.</p>"
            return
        }

        //Validate Email
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!email.match(mailformat)) {
            // alert("You have entered an invalid email address!");
            document.getElementById("error_message1").innerHTML = "<p >Invalid Email Address.</p>"
            return;
        }

        //Post Data
        axios.post("http://139.59.16.180:8269/admin/login",
        {"email":email, "password":password}
        )
        .then(res => 
            {console.log(res)
            localStorage.setItem("token",res.data.token)
            setModalShow1(true)
            // alert("LoggedIn successfully.")
            localStorage.setItem("isLoggedIn",true)
            
        })
        .catch(err => {
            if(err == "Error: Request failed with status code 401"){
                document.getElementById("error_message2").innerHTML="<p>Invalid id-password. Try again.</p>"
            }
            else{console.log(err.message)
                document.getElementById("error_message2").innerHTML="<p>Something went wrong. Try again.</p>"
            }
            return
        })
    }
    var i=0
    const showPassword = (e)=>{
        e.preventDefault()
        if(i%2==0){
        document.getElementById("password-field").type="text"; i+=1;}
        else{document.getElementById("password-field").type="password";i+=1;}
    }
    
    if(localStorage.getItem("token")){
        return <Redirect to="/myProfile" />
    }

    return (
        <div className="login">
            <div className="login_heading">
                <h1>Login</h1>
            </div>
            <div className="login_form">
            <Form>
                {/* <div id="error_message"></div> */}
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" required placeholder="Email ID" onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <div className="error_message" id="error_message1" ></div>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control id="password-field" type="password" class="form-control" required placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    <span toggle="password-field" class="fa fa-fw fa-eye field-icon toggle-password" onClick={e=>{showPassword(e)}}><VisibilityIcon/></span>
                </Form.Group>
                <div className="error_message" id="error_message2" ></div>
                <div className="login_button">
                <Button variant="primary" type="button" onClick={e => loginButton(e)} >Submit</Button>
                </div>
            </Form>
            <MyVerticallyCenteredModal
                        message="Logged In successfully."
                        show={modalShow1}
                        onHide={() => {setModalShow1(false);history.push("/tournaments");}}
                    />
            </div>
            <div className="login_footer_note">
                <p>New here? <Link to="/SignUp">SignUp</Link>
</p>
            </div>
        </div>
    )
}

export default Login
