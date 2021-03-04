import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../navbars/Sidebar';

class AddActivity extends Component {
    state = {
        title: "",
        description: "",
        category: "",
        showForm: false,
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/activities`, {
            title: this.state.title,
            description: this.state.description,
            category: this.state.category
        }, { withCredentials: true })
            .then((res) => {
                this.props.getAllActivities()
                this.setState({
                    title: "",
                    description: "",
                    category: "",
                    showForm: false
                });
            }, (error) => console.log(error))
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    toggleForm = () => {
        this.state.showForm ? this.setState({ showForm: false }) : this.setState({ showForm: true })
    }

    render() {
        return (
            <div>
            {this.state.showForm ?
                <form onSubmit={this.handleFormSubmit}>
                    <label>Title:</label>
                    <input name="title" value={this.state.title} type="text" onChange={this.handleChange} />

                    <label>Description:</label>
                    <textarea name="description" value={this.state.description} onChange={this.handleChange} />

                    <label for="category">Category:</label>
                    <input name="category" value={this.state.category} type="text" onChange={this.handleChange} />

                    <input type="submit" value="Create" />
                </form>
                : null 
                }

                <button onClick={this.toggleForm}>
                    {this.state.showForm ? "Go back" : "Create Activity"}
                </button>
            </div>
        )
    }
}

export default AddActivity;
