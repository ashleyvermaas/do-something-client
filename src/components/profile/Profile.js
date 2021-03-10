import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../services/auth-service';
import EditProfile from './EditProfile';
import './Profile.css'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.service = new AuthService();
        this.state = {
            showForm: false,
        }
    }

    logoutUser = () => {
        this.service.logout()
            .then(() => {
                this.props.setUser(null)
            })
    }

    deleteProfile = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/my-profile`, { withCredentials: true })
            .then(() => {
                this.logoutUser();
                this.props.history.push('/');
            }, (error) => console.log(error))
    }

    toggleForm = () => {
        this.state.showForm ? this.setState({ showForm: false }) : this.setState({ showForm: true })
    }


    render() {
        return (
            <div className="test">
                {this.state.showForm ?
                    <div>
                        <EditProfile {...this.props} deleteProfile={this.deleteProfile} toggleForm={this.toggleForm} updateUserDetails={this.props.updateUserDetails} />
                    </div>
                    :
                    <div className="page-container">
                        <h1>Settings</h1>
                        <h3>Profile</h3>
                        <div className="profile">
                            <img src={this.props.user.imageUrl} className="profile-img" />
                            <div className="profile-text">
                                <h4>Username:</h4>
                                <p>{this.props.user.username}</p>
                                <h4>Email: </h4>
                                <p>{this.props.user.email}</p>
                                {this.state.showForm ? null :
                                    <button onClick={this.toggleForm} className="edit-btn">Edit Profile</button>}
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Profile;
