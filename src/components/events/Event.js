import React, { Component } from 'react'

class Event extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
                <div key={this.props._id}>
                    <h4>{this.props.title}</h4>
                    <p>{this.props.description}</p>
                </div>
            </div>
        )
    }
}

export default Event
