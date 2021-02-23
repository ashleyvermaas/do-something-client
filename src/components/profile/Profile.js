import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../navbars/Sidebar';

class Profile extends Component {
    render() {
        return (
            <div>
                <Sidebar getUser={this.props.getUser} />
                <h1>Profile</h1>
                <img src={this.props.user.imageUrl} />
                <p>Username: {this.props.user.username}</p>
                <p>Email: {this.props.user.email}</p>

                <p><Link to={"/my-profile/edit"}>Edit profile</Link></p>
            </div>
        )
    }
}

export default Profile;
