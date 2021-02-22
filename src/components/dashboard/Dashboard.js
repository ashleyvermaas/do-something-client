import React, { Component } from 'react'
import axios from 'axios';
import Sidebar from '../navbars/Sidebar';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <Sidebar getUser={this.props.getUser} />
                <h1>Dashboard</h1>
            </div>
        )
    }
}

export default Dashboard;
