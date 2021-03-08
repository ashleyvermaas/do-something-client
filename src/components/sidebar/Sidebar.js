import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/auth-service';
import './Sidebar.css'

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.service = new AuthService();
    }

    logoutUser = () => {
        this.service.logout()
            .then(() => {
                this.props.setUser(null)
            })
    }
    render() {
        return (
            <div className="sidebar">
                <ul>
                    <Link to={"/"} className="text-link"><li className="sidebar-link">doSomething</li></Link>
                    <Link to={"/dashboard"} className="text-link"><li className="sidebar-link">Dashboard</li></Link>
                    <Link to={"/activities"} className="text-link"><li className="sidebar-link">Activities</li></Link>
                    <Link to={"/my-profile"} className="text-link"><li className="sidebar-link">Settings</li></Link>
                    <Link to={"/"}><button onClick={() => this.logoutUser()} className="logout-btn">Log out</button></Link>
                </ul>

            </div>
        )
    }
}

export default Sidebar;