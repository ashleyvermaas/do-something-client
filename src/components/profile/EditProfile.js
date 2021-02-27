import React, { Component } from 'react'
import Sidebar from '../navbars/Sidebar';
import axios from 'axios';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        username: this.props.user.username,
        email: this.props.user.email,
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const username = this.state.username;
        const email = this.state.email;

        axios.put(`${process.env.REACT_APP_API_URL}/my-profile`, { username, email }, {withCredentials:true})
        .then( () => {
            this.props.toggleForm()
        }, error => {
            console.log(error)
        })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <h1>Edit profile</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Username:</label>
                    <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />

                    <label>Email:</label>
                    <input type="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)} />

                    <input type="submit" value="Save changes" />
                </form>
            </div>
        )
    }
}

export default EditProfile;
