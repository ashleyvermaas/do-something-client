import React, { Component } from 'react'
import axios from 'axios';
import AddExperience from './AddExperience';
import EditExperience from './EditExperience';
import './ExperienceList.css';

class ExperiencesList extends Component {
    state = {
        selectedExperience: ""
    }

    deleteExperience = (experienceId) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/experiences/${experienceId}`, { withCredentials: true })
            .then(() => {
                this.props.getActivityDetails();
            }, (error) => console.log(error))
    }


    selectExperience = (experienceId) => {
        this.state.selectedExperience ? this.setState({ selectedExperience: "" }) : this.setState({ selectedExperience: experienceId })
    }

    render() {
        return (
            <div>
                <AddExperience activityId={this.props.activityId} getActivityDetails={this.props.getActivityDetails} />
                <div className="experience-section">
                {this.props.experiences.map(experience => {
                    const experienceId = experience._id
                    return (
                        <div key={experience._id}>
                            {this.state.selectedExperience === experience._id ? null :
                                <div className="experience-box">
                                {experience.imageUrl ? <img src={experience.imageUrl} /> : <img src='/header-img.png'/> }
                                <div className="experience-box-text">
                                    <h5>Date:</h5> <p>{experience.date}</p>
                                    <h5>Description:</h5> <p>{experience.description}</p>
                                    <h5>Rating:</h5> <p>{experience.rating}</p>
                                    <EditExperience experience={experience} getActivityDetails={this.props.getActivityDetails} selectExperience={() => this.selectExperience(experienceId)} />
                                    <button onClick={() => this.deleteExperience(experienceId)} className="delete-btn">Delete</button>
                                    </div>
                                </div>
                            }
                        </div>
                    )
                })}
                </div>
            </div>
        )
    }
}

export default ExperiencesList
