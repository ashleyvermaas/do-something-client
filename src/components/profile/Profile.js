import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Profile extends Component {
    render() {
        return (
            <div>
                <h1>Profile</h1>

                <p><Link to={"/my-profile/edit"}>Edit profile</Link></p>
            </div>
        )
    }
}

export default Profile;
