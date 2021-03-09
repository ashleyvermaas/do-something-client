import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddActivity from './AddActivity';
import Searchbar from '../searchbar/Searchbar';
import Filter from '../filter/Filter.js';
import './ActivitiesList.css';

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
                <div key={activity._id} className="activity-box">
                    <h4>{activity.title}</h4>
                    <p>{activity.description}</p>
                    <p className="category-tag">{activity.category}</p>
                    <div className="activity-box-details">
                        <p>{activity.experiences.length} {activity.experiences.length == 1 ? "Experience" : "Experiences"}</p>
                        <Link to={`/activities/${activity._id}`} className="text-link">
                            <p className="activity-box-link">More info</p>
                        </Link>
                    </div>
                </div>
            )
        })
        return (
            <div className="page-container">
                <h1>Activities</h1>
                <h2>View all</h2>
                <div className="list-actions">
                <div className="filter-actions">
                <Filter handleActivityFilter={this.handleActivityFilter} />
                <Searchbar handleSearch={this.handleActivitySearch} />
                </div>
                <AddActivity getAllActivities={this.getAllActivities} />
                </div>
                {activities}
            </div>
        )
    }
}

export default ActivitiesList;