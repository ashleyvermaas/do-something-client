import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AddActivity.css'

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

                {this.state.showForm ? null : <button onClick={this.toggleForm} className="create-btn">Create Activity</button>}

                {this.state.showForm ?
                    <div className="add-activity-box">
                        <button onClick={this.toggleForm} className="close-btn">X</button>
                        <form onSubmit={this.handleFormSubmit}>
                        <div>
                            <label>Title:</label>
                            <input name="title" value={this.state.title} type="text" onChange={this.handleChange} className="add-activity-input"/>

                            <label>Description:</label>
                            <textarea name="description" value={this.state.description} onChange={this.handleChange} className="add-activity-input"/>

                            <label for="category">Category:</label>
                            <select name="category" id="category" onChange={this.handleChange} className="add-activity-input">
                                <option value="" selected disabled hidden></option>
                                <option value="Active">Active</option>
                                <option value="Social">Social</option>
                                <option value="Creative">Creative</option>
                                <option value="Relaxing">Relaxing</option>
                                <option value="Educational">Educational</option>
                            </select></div>
                            <input type="submit" value="Create" className="add-activity-btn" />
                        </form>
                    </div>
                    : null
                }


            </div>
        )
    }
}

export default AddActivity;
