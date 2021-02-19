import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/auth-service';

class Sidebar extends Component {
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
    render() {
        return (
            <div>
                <p>doSomething</p>
                <p><Link to={"/"}>Home</Link></p>
                <p><Link to={"/dashboard"}>Dashboard</Link></p>
                <p><Link to={"/activities"}>All activities</Link></p>
                <Link to={"/"}><button onClick={() => this.logoutUser()}>Log out</button></Link>
            </div>
        )
    }
}

export default Sidebar;