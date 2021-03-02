import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../navbars/Sidebar';
import AddActivity from './AddActivity';
import Searchbar from '../searchbar/Searchbar';

class ActivitiesList extends Component {
    state = {
        listOfActivities: [],
        showForm: false,
        displayedActivities: [],
        searchInput: '',
        showSearchbar: false
    }

    getAllActivities = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/activities`, { withCredentials: true })
            .then((responseFromApi) => {
                this.setState({
                    listOfActivities: responseFromApi.data,
                    displayedActivities: [...responseFromApi.data]
                })
            }, error => console.log(error));
    }

    componentDidMount() {
        this.getAllActivities()
    }

    toggleForm = () => {
        this.state.showForm ? this.setState({ showForm: false }) : this.setState({ showForm: true })
    }

    handleCheckbox = (e) => {
        const newStatus = e.target.defaultChecked === true ? "To do" : "Completed";
        axios.put(`${process.env.REACT_APP_API_URL}/activities/${e.target.id}`, {
            status: newStatus
        }, { withCredentials: true })
            .then(
                this.getAllActivities()
            ).catch(err => {
                console.log("An error occurred: ", err);
            });
    }

    handleActivitySearch = (searchInput) => {
        const filteredList = this.state.listOfActivities.filter(activity => (activity.title.toUpperCase().includes(searchInput.toUpperCase())))
        this.setState({
            displayedActivities: filteredList
        })
    }

    toggleSearchbar = () => {
        this.state.showSearchbar ? this.setState({ showSearchbar: false }) : this.setState({ showSearchbar: true })
    }

    render() {
        const activities = this.state.displayedActivities.map(activity => {
            return (
                <div key={activity._id}>
                    <h4>{activity.title}</h4>
                    <p>{activity.description}</p>
                    <p>{activity.category}</p>
                    <input type="checkbox" id={activity._id} defaultChecked={activity.status === "Completed" ? true : false} onChange={(e) => this.handleCheckbox(e)} />
                    <label for={activity._id}>Completed</label>
                    <Link to={`/activities/${activity._id}`}>
                        <p>More info</p>
                    </Link>
                </div>
            )
        })
        return (
            <div>
                {this.state.showForm ?
                    <div>
                        <AddActivity toggleForm={this.toggleForm} getAllActivities={this.getAllActivities} />
                    </div>
                    :
                    <div>
                        <button onClick={this.toggleSearchbar}>Search</button>
                        {this.state.showSearchbar ? <Searchbar handleSearch={this.handleActivitySearch} /> : null}

                        {activities}
                    </div>}

                <button onClick={this.toggleForm}>
                    {this.state.showForm ? "Go back" : "Create Activity"}
                </button>
            </div>
        )
    }
}

export default ActivitiesList;