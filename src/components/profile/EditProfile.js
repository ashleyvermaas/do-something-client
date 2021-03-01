import React, { Component } from 'react'
import Sidebar from '../navbars/Sidebar';
import axios from 'axios';


class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.user.username,
            email: this.props.user.email,
            imageUrl: this.props.user.imageUrl
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const username = this.state.username;
        const email = this.state.email;
        const imageUrl = this.state.imageUrl

        axios.put(`${process.env.REACT_APP_API_URL}/my-profile`, { username, email, imageUrl }, { withCredentials: true })
            .then(() => {
                this.props.updateUserDetails(username, email, imageUrl)
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

    handleFileUpload = (event) => {
        const uploadData = new FormData();
        uploadData.append("imageUrl", event.target.files[0]);

        axios.post(`${process.env.REACT_APP_API_URL}/upload`, uploadData)
            .then(response => {
                this.setState({ imageUrl: response.data.secure_url });
            })
            .catch(err => {
                console.log("An error occurred while uploading the file: ", err);
            });
    }

    render() {
        return (
            <div>
                <h1>Edit profile</h1>
                <img src={this.props.user.imageUrl} />
                <form onSubmit={this.handleFormSubmit}>
                    <label>Username:</label>
                    <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />

                    <label>Email:</label>
                    <input type="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)} />

                    <label>Profile picture</label>
                    <input type="file" name="imageUrl" accept="image/png, image/jpg" onChange={(e) => this.handleFileUpload(e)} />

                    <input type="submit" value="Save changes" />
                </form>
            </div>
        )
    }
}

export default EditProfile;
