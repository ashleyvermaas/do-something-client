import React, { Component } from 'react'
import axios from 'axios';
import './EditProfile.css';


class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.user.username,
            email: this.props.user.email,
            imageUrl: this.props.user.imageUrl,
            showWarning: false
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

    toggleWarning = () => {
        this.state.showWarning ? this.setState({ showWarning: false }) : this.setState({ showWarning: true })
    }

    render() {
        return (
            <div className="page-container">
                <h1>Settings</h1>
                <h2>Edit profile</h2>
                <div className="profile">
                <img src={this.props.user.imageUrl} className="profile-img"/>
                <div className="profile-text">
                <form onSubmit={this.handleFormSubmit}>
                    <label>Username:</label>
                    <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} className="edit-profile-input" />

                    <label>Email:</label>
                    <input type="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)} className="edit-profile-input" />

                    <label>Profile picture</label>
                    <input type="file" name="imageUrl" accept="image/png, image/jpg" onChange={(e) => this.handleFileUpload(e)} className="edit-profile-input" />

                    <input type="submit" value="Save changes" />
                </form>
                <button onClick={this.toggleWarning}>Delete profile</button>
                        {this.state.showWarning ?
                            <div>
                                <p>Are you sure you want to delete your account?</p>
                                <button onClick={this.props.deleteProfile}>Yes, delete my account</button>
                            </div>
                            :
                            null
                        }
                <button onClick={this.props.toggleForm}>Go back</button>
                </div>
                </div>
            </div>
        )
    }
}

export default EditProfile;
