import React, { Component } from 'react';
import axios from 'axios';
import './AddExperience.css';

class AddExperience extends Component {
    state = {
        date: "",
        description: "",
        rating: "",
        imageUrl: "",
        showForm: false
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleFileUpload = (event) => {
        const uploadData = new FormData();
        uploadData.append("imageUrl", event.target.files[0]);

        axios.post(`${process.env.REACT_APP_API_URL}/upload`, uploadData, {withCredentials:true})
            .then(response => {
                this.setState({ imageUrl: response.data.secure_url });
            })
            .catch(err => {
                console.log("An error occurred while uploading the file: ", err);
            });
    }


    handleFormSubmit = (e) => {
        e.preventDefault();
        const date = this.state.date;
        const description = this.state.description;
        const rating = this.state.rating;
        const imageUrl = this.state.imageUrl;
        const activityId = this.props.activityId;

        axios.post(`${process.env.REACT_APP_API_URL}/activities/${activityId}/experiences`, { date, description, rating, imageUrl }, { withCredentials: true })
            .then(() => {
                this.props.getActivityDetails();
                this.setState({
                    date: "",
                    description: "",
                    rating: "",
                    imageUrl: "",
                    showForm: false,
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    toggleForm = () => {
        this.state.showForm ? this.setState({ showForm: false }) : this.setState({ showForm: true })
    }

    render() {
        return (
            <div >
                {this.state.showForm ?
                    <div className="add-experience-box">
                        <button onClick={this.toggleForm} className="close-btn">X</button>
                        <form onSubmit={this.handleFormSubmit}>
                            <div className="add-experience-content">
                                <label for="date-input">Date:</label>
                                <input type="date" name="date" id="date-input" value={this.state.date} onChange={this.handleChange} className="add-experience-input" />

                                <label for="description-input">Description:</label>
                                <textarea name="description" id="description-input" cols="30" rows="4" value={this.state.description} onChange={this.handleChange} className="add-experience-input"> </textarea>

                                <label for="rating-input">Rating:</label>
                                <input type="radio" name="rating" id="rating-input1" value="1" onChange={this.handleChange} className="rating-input" /><label htmlFor="rating-input1">1</label>
                                <input type="radio" name="rating" id="rating-input2" value="2" onChange={this.handleChange} className="rating-input" /><label htmlFor="rating-input2">2</label>
                                <input type="radio" name="rating" id="rating-input3" value="3" onChange={this.handleChange} className="rating-input" /><label htmlFor="rating-input3">3</label>
                                <input type="radio" name="rating" id="rating-input4" value="4" onChange={this.handleChange} className="rating-input" /><label htmlFor="rating-input4">4</label>
                                <input type="radio" name="rating" id="rating-input5" value="5" onChange={this.handleChange} className="rating-input" /><label htmlFor="rating-input5">5</label>

                                <div className="add-experience-img">
                                    <label for="imageUrl-input" >Upload Image:</label>
                                    <input type="file" name="imageUrl" accept="image/png, image/jpg" id="imageUrl-input" onChange={this.handleFileUpload} className="add-experience-input" />
                                </div>
                            </div>
                            <button type="submit" className="create-btn">Add experience</button>

                        </form>
                    </div>
                    :
                    <button onClick={this.toggleForm} className="create-btn">Create experience</button>
                }
            </div>
        )
    }
}

export default AddExperience
