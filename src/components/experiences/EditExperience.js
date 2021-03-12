import React, { Component } from 'react'
import axios from 'axios';

class EditExperience extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: this.props.experience.date,
            description: this.props.experience.description,
            rating: this.props.experience.rating,
            imageUrl: this.props.experience.imageUrl,
            showForm: false
        }
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

        axios.post(`${process.env.REACT_APP_API_URL}/upload`, uploadData)
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
        const experienceId = this.props.experience._id;

        axios.put(`${process.env.REACT_APP_API_URL}/experiences/${experienceId}`, { date, description, rating, imageUrl }, { withCredentials: true })
            .then(() => {
                this.props.getActivityDetails();
                this.toggleForm();
                this.setState({
                    date: "",
                    description: "",
                    rating: "",
                    imageUrl: "",
                    showForm: false
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    toggleForm = () => {
        this.state.showForm ? this.setState({ showForm: false }) : this.setState({ showForm: true })
        this.props.selectExperience(this.props.experience._id)
    }

    render() {
        return (
            <div>
                {this.state.showForm ?
                    <div>
                        <button onClick={this.toggleForm} className="close-btn">X</button>
                        <form onSubmit={this.handleFormSubmit}>
                            <label for="description-input">Description:</label>
                            <textarea name="description" id="description-input" cols="30" rows="4" value={this.state.description} onChange={this.handleChange} > </textarea>

                            <label for="date-input">Date:</label>
                            <input type="date" name="date" id="date-input" value={this.state.date} onChange={this.handleChange} />

                            <label for="imageUrl-input">Upload Image:</label>
                            <input type="file" name="imageUrl" accept="image/png, image/jpg" id="imageUrl-input" onChange={this.handleFileUpload} />

                            <label for="rating-input">Rating:</label>
                            <input type="radio" name="rating" id="rating-input1" value="1" checked={this.state.rating === 1 ? true : false} onChange={this.handleChange} /><label htmlFor="rating-input1">1</label>
                            <input type="radio" name="rating" id="rating-input2" value="2" checked={this.state.rating === 2 ? true : false} onChange={this.handleChange} /><label htmlFor="rating-input2">2</label>
                            <input type="radio" name="rating" id="rating-input3" value="3" checked={this.state.rating === 3 ? true : false} onChange={this.handleChange} /><label htmlFor="rating-input3">3</label>
                            <input type="radio" name="rating" id="rating-input4" value="4" checked={this.state.rating === 4 ? true : false} onChange={this.handleChange} /><label htmlFor="rating-input4">4</label>
                            <input type="radio" name="rating" id="rating-input5" value="5" checked={this.state.rating === 5 ? true : false} onChange={this.handleChange} /><label htmlFor="rating-input5">5</label>

                            <button type="submit">Save changes</button>
                        </form>
                    </div>
                    :
                    <button onClick={this.toggleForm} className="edit-btn">Edit experience</button>
                }

            </div>
        )
    }
}

export default EditExperience
