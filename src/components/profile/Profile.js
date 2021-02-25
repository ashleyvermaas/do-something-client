import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../navbars/Sidebar';
import axios from 'axios';
import AuthService from '../services/auth-service';
import EditProfile from './EditProfile';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.service = new AuthService();
        this.state = {
            showForm: false
        }
    }

    logoutUser = () => {
        this.service.logout()
            .then(() => {
                this.props.setUser(null)
            })
    }

    deleteProfile = () => {
        axios.delete(`http://localhost:5000/api/my-profile`, { withCredentials: true })
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
            <div>
                {this.state.showForm ? <div>
                    <EditProfile {...this.props} toggleForm={this.toggleForm}/>
                    <button onClick={this.toggleForm}>Go back</button>
                    </div> : <div>
                        <h1>Profile</h1>
                        <img src={this.props.user.imageUrl} />
                        <p>Username: {this.props.user.username}</p>
                        <p>Email: {this.props.user.email}</p>
                        <button onClick={this.toggleForm}>Edit Profile</button>
                        <button onClick={this.deleteProfile}>Delete profile</button>
                    </div>
                }
            </div>
        )
    }
}

export default Profile;
