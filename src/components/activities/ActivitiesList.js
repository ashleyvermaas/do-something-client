import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../navbars/Sidebar';

class ActivitiesList extends Component {
    state = {
        listOfActivities: []
    }

    getAllActivities = () => {
        axios.get(`http://localhost:5000/api/activities`, { withCredentials: true })
            .then((responseFromApi) => {
                this.setState({
                    listOfActivities: responseFromApi.data
                })
            }, error => console.log(error));
    }

    componentDidMount() {
        this.getAllActivities()
    }

    render() {
        const activities = this.state.listOfActivities.map(activity => {
            return (
                <div key={activity._id}>
                    <Link to={`/activities/${activity._id}`}>
                        <h4>{activity.title}</h4>
                    </Link>
                </div>
            )
        })
        return (
            <div>
                {activities}
                <hr></hr>
                <Link to={"/activities/create"}>Create activity</Link>
            </div>
        )
    }
}

export default ActivitiesList;