import React, { Component } from 'react';
import axios from 'axios';
import './EditActivity.css';

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
                this.props.getActivityDetails()
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

    deleteActivity = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/activities/${this.props.match.params.activityId}`, { withCredentials: true })
            .then(() => {
                this.props.history.push('/activities');
            }, (error) => console.log(error))
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
                        <select name="category" id="category" onChange={this.handleChange} value={this.state.category}>
                            <option value="Active">Active</option>
                            <option value="Social">Social</option>
                            <option value="Creative">Creative</option>
                            <option value="Funny">Funny</option>
                        </select>

                    <input type="submit" value="Save changes" className="save-btn" />
                </form>
                <button onClick={this.deleteActivity} className="delete-btn">Delete</button>
            </div>
        )
    }
}

export default EditActivity;
