import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../services/auth-service';
import EditProfile from './EditProfile';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.service = new AuthService();
        this.state = {
            showForm: false,
            showWarning: false
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

    toggleWarning = () => {
        this.state.showWarning ? this.setState({ showWarning: false }) : this.setState({ showWarning: true })
    }

    render() {
        return (
            <div>
                {this.state.showForm ?
                    <div>
                        <EditProfile {...this.props} toggleForm={this.toggleForm} updateUserDetails={this.props.updateUserDetails} />
                    </div>
                    :
                    <div>
                        <h1>Profile</h1>
                        <img src={this.props.user.imageUrl} />
                        <p>Username: {this.props.user.username}</p>
                        <p>Email: {this.props.user.email}</p>
                        <button onClick={this.toggleWarning}>Delete profile</button>
                        {this.state.showWarning ?
                            <div>
                                <p>Are you sure you want to delete your account?</p>
                                <button onClick={this.deleteProfile}>Yes, delete my account</button>
                            </div>
                            :
                            null
                        }
                    </div>
                }
                <button onClick={this.toggleForm}>
                    {this.state.showForm ? "Go back" : "Edit Profile"}
                </button>
            </div>
        )
    }
}

export default Profile;
