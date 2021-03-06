import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddActivity from './AddActivity';
import Searchbar from '../searchbar/Searchbar';
import Filter from '../filter/Filter.js';

class ActivitiesList extends Component {
    state = {
        listOfActivities: [],
        displayedActivities: [],
        searchInput: '',
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
        const searchResult = this.state.listOfActivities.filter(activity => (activity.title.toUpperCase().includes(searchInput.toUpperCase())))
        this.setState({
            displayedActivities: searchResult
        })
    }

    handleActivityFilter = (stateOfFilter) => {
        const { active, social, creative, funny } = stateOfFilter
        const currentFilters = []

        if (active) {
            currentFilters.push("Active")
        }
        if (social) {
            currentFilters.push("Social")
        }
        if (creative) {
            currentFilters.push("Creative")
        }
        if (funny) {
            currentFilters.push("Funny")
        }

        const filterResult = this.state.listOfActivities.filter(activity => (currentFilters.some(element => activity.category.includes(element))))
        {
            filterResult.length > 0 ? this.setState({
                displayedActivities: filterResult
            }) : this.setState({
                displayedActivities: this.state.listOfActivities
            })
        }
    }

    render() {
        const activities = this.state.displayedActivities.map(activity => {
            return (
                <div key={activity._id}>
                    <h4>{activity.title}</h4>
                    <p>{activity.description}</p>
                    <p>{activity.category}</p>
                    <p>{activity.experiences.length} {activity.experiences.length == 1 ? "Experience" : "Experiences" }</p>
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
                <AddActivity getAllActivities={this.getAllActivities} />

                <Searchbar handleSearch={this.handleActivitySearch} /> 
                <Filter handleActivityFilter={this.handleActivityFilter} />
                {activities}
            </div>
        )
    }
}

export default ActivitiesList;