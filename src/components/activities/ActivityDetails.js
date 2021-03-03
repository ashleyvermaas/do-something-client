import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../navbars/Sidebar';
import EditActivity from './EditActivity';
import AddExperience from '../experiences/AddExperience';

class ActivityDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            category: "",
            status: "",
            owner: "",
            _id: "",
            showForm: false
        }
    }

    getActivityDetails = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/activities/${this.props.match.params.activityId}`, { withCredentials: true })
            .then((responseFromApi) => {
                const selectedActivity = responseFromApi.data
                this.setState(selectedActivity)
            }, error => console.log(error))
    }

    componentDidMount() {
        this.getActivityDetails()
    }

    deleteActivity = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/activities/${this.props.match.params.activityId}`, { withCredentials: true })
            .then(() => {
                this.props.history.push('/activities');
            }, (error) => console.log(error))
    }

    toggleForm = () => {
        this.state.showForm ? this.setState({ showForm: false }) : this.setState({ showForm: true })
    }

    render() {
        return (
            <div>
                {this.state.showForm ?
                    <div>
                        <EditActivity {...this.props} theActivity={this.state} toggleForm={this.toggleForm} />
                    </div>
                    :
                    <div>
                        <h4>{this.state.title}</h4>
                        <p>{this.state.description}</p>
                        <p>{this.state.category}</p>
                        <p>{this.state.status}</p>
                        
                        <AddExperience activity={this.state._id} />

                        <button onClick={this.deleteActivity}>Delete</button>
                        <Link to={'/activities'}>
                            <button>Go back</button>
                        </Link>
                    </div>}

                <button onClick={this.toggleForm}>
                    {this.state.showForm ? "Go back" : "Edit Activity"}
                </button>

            </div>
        )
    }
}

export default ActivityDetails;
