import React, { useEffect, useState } from 'react'
import "../Styles/MyProfile.scss"
import FooterButtons from './FooterButtons';
import Axios from 'axios';
import {useHistory} from "react-router-dom"
import {Modal, Button} from "react-bootstrap"

function MyProfile() {

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const history = useHistory()
    const [modalShow1,setModalShow1] = useState(false)
    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <h4>{props.heading}</h4>
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

    // if(localStorage.getItem("token") === null){
    //     window.location.href="/login"
    // }

    // useEffect(()=>{
    //     const status = localStorage.getItem("isLoggedIn")
    //     console.log(status)
    //     if(status===false){
    //         history.push("/")
    //     }
    // })
    
    useEffect(() => {

        Axios.get("http://139.59.16.180:8269/admin/profile",
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        ).then(res => {
            setName(res.data.data.name)
            setEmail(res.data.data.email)
            setImage(res.data.data.imageUrl)
        })
            .catch(err => console.log(err))

    },[1])

    useEffect(() => {
        document.getElementById("footer-profile-btn").click()
    }, [1])

    const logout = (e)=>{
        localStorage.removeItem("token")
        // localStorage.setItem("isLoggedIn",false)
        // alert("You are successfully logged out.")
        setModalShow1(true)
        
    }

    return (
        <div className="myProfile">
            <div className="myProfile_heading">
                <strong>My Profile</strong>
            </div>
            <div className="myProfile_banner">

            </div>
            <div className="myProfile_dp">
                <div className="myProfile_pic">
                    <img src={require("../Media/dummy_dp.png")} alt="profile pic" />
                </div>
                {/* <a href="http://www.google.com">Add image</a> */}
            </div>
            <div className="myProfile_details">
                <h5 style={{"fontWeight":"550"}}>{name}</h5>
                <h6>{email}</h6>
                <Button variant="outline-primary" className="logout_button "
                        onClick={e => logout(e)}>LogOut</Button> 
                {/* <a onClick={e=>logout(e)}>Logout</a> */}
            </div>
            <MyVerticallyCenteredModal
                        message="Logged out."
                        show={modalShow1}
                        onHide={() => {setModalShow1(false); history.push("/");}}
                    />
            <FooterButtons />
        </div>
    )
}

export default MyProfile
