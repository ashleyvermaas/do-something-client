import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditActivity from './EditActivity';
import AddExperience from '../experiences/AddExperience';
import ExperiencesList from '../experiences/ExperiencesList';
import './ActivityDetails.css';

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
            showForm: false,
            experiences: []
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

    toggleForm = () => {
        this.state.showForm ? this.setState({ showForm: false }) : this.setState({ showForm: true })
    }

    render() {
        return (
            <div className="page-container">
                <h1>Activities</h1>
                {this.state.showForm ? <h3>Edit activity</h3> : <h3>Details</h3>}
                <div className="activity-details-page">
                    <div>
                        {this.state.showForm ?
                            <div className="activity-box">
                            <button onClick={this.toggleForm} className="close-btn">X</button>
                                <EditActivity {...this.props} theActivity={this.state} toggleForm={this.toggleForm} getActivityDetails={this.getActivityDetails} />
                            </div>
                            :
                            <div className="activity-box">
                                <h4>{this.state.title}</h4>
                                <p>{this.state.description}</p>
                                <p className="category-tag">{this.state.category}</p>
                                <div className="activity-box-details">
                                <p>{this.state.experiences.length} {this.state.experiences.length == 1 ? "Experience" : "Experiences"}</p>
                                <button onClick={this.toggleForm} className="edit-btn">Edit Activity</button>
                                </div>
                            </div>
                        }

                        

                    </div>
                    <ExperiencesList experiences={this.state.experiences} activityId={this.state._id} getActivityDetails={this.getActivityDetails} />
                </div>
            </div>
        )
    }
}

export default ActivityDetails;
