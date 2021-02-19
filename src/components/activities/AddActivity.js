import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AddActivity extends Component {
    state = {
        title: "",
        description: "",
        category: "",
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/activities/create", {
            title: this.state.title,
            description: this.state.description,
            category: this.state.category
        }, { withCredentials: true })
            .then((res) => {
                this.props.history.push('/activities')
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
                <form onSubmit={this.handleFormSubmit}>
                    <label>Title:</label>
                    <input name="title" value={this.state.title} type="text" onChange={this.handleChange} />

                    <label>Description:</label>
                    <textarea name="description" value={this.state.description} onChange={this.handleChange} />

                    <label for="category">Category:</label>
                    <input name="category" value={this.state.category} type="text" onChange={this.handleChange} />

                    <input type="submit" value="Create" />
                </form>
            </div>
        )
    }
}

export default AddActivity;
