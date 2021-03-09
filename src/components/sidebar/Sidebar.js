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
                    <Link to={"/"} className="text-link"><li className="sidebar-link"><h3>doSomething</h3></li></Link>
                    <Link to={"/dashboard"} className="text-link"><li className="sidebar-link"><h4>Dashboard</h4></li></Link>
                    <Link to={"/activities"} className="text-link"><li className="sidebar-link"><h4>Activities</h4></li></Link>
                    <Link to={"/my-profile"} className="text-link"><li className="sidebar-link"><h4>Settings</h4></li></Link>
                    <Link to={"/"}><button onClick={() => this.logoutUser()} className="logout-btn"><h4>Log out</h4></button></Link>
                </ul>

            </div>
        )
    }
}

export default Sidebar;