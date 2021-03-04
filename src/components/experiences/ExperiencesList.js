import React, { Component } from 'react'
import axios from 'axios';

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
