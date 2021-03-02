import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from '../searchbar/Searchbar';
import Event from './Event';
import AddEvent from './AddEvent';

class EventsList extends Component {
    state = {
        listOfEvents: [],
        showForm: false,
        displayedEvents: [],
        searchInput: '',
        showSearchbar: false
    }

    getAllEvents = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/events`, { withCredentials: true })
            .then((responseFromApi) => {
                this.setState({
                    listOfEvents: responseFromApi.data,
                    displayedEvents: [...responseFromApi.data]
                })
            }, error => console.log(error));
    }

    componentDidMount() {
        this.getAllEvents()
    }

    toggleForm = () => {
        this.state.showForm ? this.setState({ showForm: false }) : this.setState({ showForm: true })
    }

    handleEventSearch = (searchInput) => {
        const filteredList = this.state.listOfEvents.filter(event => (event.title.toUpperCase().includes(searchInput.toUpperCase())))
        this.setState({
            displayedEvents: filteredList
        })
    }

    toggleSearchbar = () => {
        this.state.showSearchbar ? this.setState({ showSearchbar: false }) : this.setState({ showSearchbar: true })
    }

    render() {
        const events = this.state.displayedEvents.map(event => {
            return (
                <Event id={event._id} title={event.title} description={event.description} />
            )
        })
        return (
            <div>
                {this.state.showForm ?
                    <div>
                        <AddEvent toggleForm={this.toggleForm} getAllEvents={this.getAllEvents} />
                    </div>
                    :
                    <div>
                        <button onClick={this.toggleSearchbar}>Search</button>
                        {this.state.showSearchbar ? <Searchbar handleSearch={this.handleEventSearch} /> : null}

                        {events}
                    </div>}

                <button onClick={this.toggleForm}>
                    {this.state.showForm ? "Go back" : "Create Event"}
                </button>
            </div>
        )
    }
}

export default EventsList
