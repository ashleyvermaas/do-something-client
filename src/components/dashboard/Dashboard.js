import React, { Component } from 'react'
import axios from 'axios';
import Sidebar from '../navbars/Sidebar';

class Dashboard extends Component {
    render() {
        return (
            <div>
            <Sidebar />
            <h1>Dashboard</h1>                
            </div>
        )
    }
}

export default Dashboard;
