import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../navbars/Sidebar';

class ActivityDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            category: "",
            status: "",
            owner: "",
            _id: ""
        }
    }

    getActivityDetails = () => {
        axios.get(`http://localhost:5000/api/activities/${this.props.match.params.activityId}`, { withCredentials: true })
            .then((responseFromApi) => {
                const selectedActivity = responseFromApi.data
                this.setState(selectedActivity)
            }, error => console.log(error))
    }

    componentDidMount() {
        this.getActivityDetails()
    }

    deleteActivity = () => {
        axios.delete(`http://localhost:5000/api/activities/${this.props.match.params.activityId}`, { withCredentials: true })
        .then(() => {
            this.props.history.push('/activities');
        }, (error) => console.log(error))
    }

    render() {
        return (
            <div>
                <Sidebar />
                <h4>{this.state.title}</h4>
                <p>{this.state.description}</p>
                <p>{this.state.category}</p>
                <p>{this.state.status}</p>

                <p><Link to={{pathname: `/activities/${this.props.match.params.activityId}/edit`,
                state: { title: this.state.title } }}>Edit activity</Link></p>
                <button onClick={this.deleteActivity}>Delete</button>
            </div>
        )
    }
}

export default ActivityDetails;
