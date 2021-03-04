import React, { Component } from 'react'
import axios from 'axios';
import AddExperience from './AddExperience';

class ExperiencesList extends Component {
    deleteExperience = (e) => {
        const experienceId = e.target.id 
        axios.delete(`${process.env.REACT_APP_API_URL}/experiences/${experienceId}`, { withCredentials: true })
            .then(() => {
                this.props.getActivityDetails();
            }, (error) => console.log(error))
    }

    render() {
        return (
            <div>
             <AddExperience activityId={this.props.activityId} getActivityDetails={this.props.getActivityDetails} />

                {this.props.experiences.map(experience => {
                    return(
                        <div key={experience._id}>
                            <p>{experience.date}</p>
                            <p>{experience.description}</p>
                            <p>{experience.rating}</p>
                            <img src={experience.imageUrl} />
                            <button onClick={this.deleteExperience} id={experience._id}>Delete experience</button>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ExperiencesList
