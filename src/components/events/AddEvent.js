import React, { Component } from 'react';
import axios from 'axios';

class AddEvent extends Component {
    state = {
        title: "",
        description: "",
        activities: []
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/events`, {
            title: this.state.title,
            description: this.state.description,
            activities: this.state.activities
        }, { withCredentials: true })
            .then((res) => {
                this.props.getAllEvents()
                this.props.toggleForm()
                this.setState({
                    title: "",
                    description: "",
                    activities: []
                });
            }, (error) => console.log(error))
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    render() {
        return (
            <div>
                <div>
                    <form onSubmit={this.handleFormSubmit}>
                        <label>Title:</label>
                        <input name="title" value={this.state.title} type="text" onChange={this.handleChange} />

                        <label>Description:</label>
                        <textarea name="description" value={this.state.description} onChange={this.handleChange} />

                        <label for="activities">Activities:</label>
                        <input name="activities" value={this.state.activities} type="text" onChange={this.handleChange} />

                        <input type="checkbox" name="activities" value="Cats" />
                        <input type="submit" value="Create" />
                    </form>
                </div>
            </div>
        )
    }
}

export default AddEvent
