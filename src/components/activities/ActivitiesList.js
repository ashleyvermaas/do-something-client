import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../navbars/Sidebar';
import AddActivity from './AddActivity';

class ActivitiesList extends Component {
    state = {
        listOfActivities: [],
        showForm: false
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

    toggleForm = () => {
        this.state.showForm ? this.setState({ showForm: false }) : this.setState({ showForm: true })
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
                {this.state.showForm ? 
                <div>
                    <AddActivity toggleForm={this.toggleForm} getAllActivities={this.getAllActivities}/>
                </div> 
                : 
                <div>
                    {activities}
                </div>}

                <button onClick={this.toggleForm}>
                    {this.state.showForm ? "Go back" : "Create Activity"}
                </button>
            </div>
        )
    }
}

export default ActivitiesList;