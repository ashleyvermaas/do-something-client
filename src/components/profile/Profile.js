import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../navbars/Sidebar';
import axios from 'axios';
import AuthService from '../services/auth-service';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.service = new AuthService();
    }

    logoutUser = () => {
        this.service.logout()
            .then(() => {
                this.props.getUser(null)
            })
    }

    deleteProfile = () => {
        axios.delete(`http://localhost:5000/api/my-profile`, { withCredentials: true })
        .then(() => {
            this.logoutUser();
            this.props.history.push('/');
        }, (error) => console.log(error))
    }

    render() {
        return (
            <div>
                <Sidebar getUser={this.props.getUser} />
                <h1>Profile</h1>
                <img src={this.props.user.imageUrl} />
                <p>Username: {this.props.user.username}</p>
                <p>Email: {this.props.user.email}</p>

                <p><Link to={"/my-profile/edit"}>Edit profile</Link></p>
                <button onClick={this.deleteProfile}>Delete profile</button>
            </div>
        )
    }
}

export default Profile;
