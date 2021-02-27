import React, { Component } from 'react';
import Sidebar from '../navbars/Sidebar';
import axios from 'axios';

class EditActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.theActivity.title,
            description: this.props.theActivity.description,
            category: this.props.theActivity.category
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        axios.put(`${process.env.REACT_APP_API_URL}/activities/${this.props.match.params.activityId}`, {
            title: this.state.title,
            description: this.state.description,
            category: this.state.category
        }, { withCredentials: true })
            .then((res) => {
                this.props.toggleForm()
                this.setState({
                    title: "",
                    description: "",
                    category: ""
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
                <h1>Edit Activity</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Title:</label>
                    <input name="title" value={this.state.title} type="text" onChange={this.handleChange} />

                    <label>Description:</label>
                    <textarea name="description" value={this.state.description} onChange={this.handleChange} />

                    <label for="category">Category:</label>
                    <input name="category" value={this.state.category} type="text" onChange={this.handleChange} />

                    <input type="submit" value="Save changes" />
                </form>
            </div>
        )
    }
}

export default EditActivity;
