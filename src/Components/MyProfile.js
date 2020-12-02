import React, { useEffect, useState } from 'react'
import "../Styles/MyProfile.scss"
import FooterButtons from './FooterButtons';
import Axios from 'axios';
import {useHistory} from "react-router-dom"

function MyProfile() {

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const history = useHistory()
    
    useEffect(() => {

        Axios.get("http://139.59.16.180:8269/admin/profile",
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        ).then(res => {
            setName(res.data.name)
            setEmail(res.data.email)
        })
            .catch(err => console.log(err))

    },[1])

    useEffect(() => {
        document.getElementById("footer-profile-btn").click()
    }, [1])

    const logout = (e)=>{
        localStorage.setItem("isLoggedIn",false)
        alert("You are successfully logged out.")
        history.push("/")
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
                <a href="http://www.google.com">Add image</a>
            </div>
            <div className="myProfile_details">
                <h5 style={{"fontWeight":"550"}}>{name}</h5>
                <h6>{email}</h6>
                <a onClick={e=>logout(e)}>Logout</a>
            </div>
            <FooterButtons />
        </div>
    )
}

export default MyProfile
