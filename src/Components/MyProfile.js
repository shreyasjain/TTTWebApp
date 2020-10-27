import React from 'react'
import "../Styles/MyProfile.scss"
import FooterButtons from './FooterButtons';

function MyProfile() {
    return (
        <div className="myProfile">
            <div className="myProfile_heading">
                <strong>My Profile</strong>
            </div>
            <div className="myProfile_banner">

            </div>
            <div className="myProfile_dp">
                <div className="myProfile_pic">
                    <img src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="profile pic" />
                </div>
                <a href="http://www.google.com">Add image</a>
            </div>
            <div className="myProfile_details">
                <h5>John Cena</h5>
                <h6>johncena@gmail.com</h6>
                <a href="http://www.google.com">Add more details</a>
            </div>
            <FooterButtons />
        </div>
    )
}

export default MyProfile
