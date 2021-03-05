import React, { Component } from 'react'
import axios from 'axios';
import AddExperience from './AddExperience';
import EditExperience from './EditExperience';

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

                {this.props.experiences.map(experience => {
                    const experienceId = experience._id
                    return (
                        <div key={experience._id}>
                            {this.state.selectedExperience === experience._id ? null :
                                <div>
                                    <p>{experience.date}</p>
                                    <p>{experience.description}</p>
                                    <p>{experience.rating}</p>
                                    <img src={experience.imageUrl} />
                                </div>
                            }

                            <EditExperience experience={experience} getActivityDetails={this.props.getActivityDetails} selectExperience={() => this.selectExperience(experienceId)} />
                            <button onClick={() => this.deleteExperience(experienceId)}>Delete experience</button>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ExperiencesList
