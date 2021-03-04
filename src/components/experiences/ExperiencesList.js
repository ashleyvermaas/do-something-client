import React, { Component } from 'react'
import axios from 'axios';

class ExperiencesList extends Component {
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
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ExperiencesList
