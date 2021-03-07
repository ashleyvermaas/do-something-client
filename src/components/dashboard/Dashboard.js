import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfActivities: [],
            randomActivity: "",
            listOfExperiences: [],
            counter: 0,
            displayedExperience: ""
        }
    }

    getAllActivities = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/activities`, { withCredentials: true })
            .then((responseFromApi) => {
                this.setState({
                    listOfActivities: responseFromApi.data
                })
            }, error => console.log(error));
    }

    componentDidMount() {
        this.getAllActivities()
        this.getAllExperiences()
    }

    getRandomActivity = () => {
        const randomActivity = this.state.listOfActivities[Math.floor(Math.random() * this.state.listOfActivities.length)];
        this.setState({
            randomActivity: randomActivity
        })
    }

    getAllExperiences = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/experiences`, { withCredentials: true })
            .then((responseFromApi) => {
                this.setState({
                    listOfExperiences: responseFromApi.data,
                    displayedExperience: responseFromApi.data[0]
                })
            }, error => console.log(error));
    }

    getNextExperience = () => {
        if (this.state.counter < this.state.listOfExperiences.length - 1 ) {
            this.setState((prevState) => {
                return {
                    counter: prevState.counter + 1,
                    displayedExperience: this.state.listOfExperiences[prevState.counter + 1]
                }
            }, () => console.log(this.state.counter))
        }
    }

    getPrevExperience = () => {
        if (this.state.counter > 0) {
            this.setState((prevState) => {
                return {
                    counter: prevState.counter - 1,
                    displayedExperience: this.state.listOfExperiences[prevState.counter - 1]
                }
            }, () => console.log(this.state.counter))
        }
    }

    render() {
        const completedActivities = this.state.listOfActivities.filter(activity => (activity.status.includes("Completed"))).map(activity => {
            return (
                <div key={activity._id}>
                    <p>{activity.title}</p>
                </div>
            )
        })

        return (
            <div>
                <h1>Dashboard</h1>
                <section>
                    <h2>Random activity</h2>

                    <div>
                        <Link to={`/activities/${this.state.randomActivity._id}`}><p>{this.state.randomActivity.title}</p></Link>
                        <p>{this.state.randomActivity.description}</p>
                        <p>{this.state.randomActivity.category}</p>
                    </div>
                    <button onClick={this.getRandomActivity}>Get Random Activity</button>
                </section>

                <section>
                    <div>
                        <h2>Last experiences</h2>
                        <p>{this.state.displayedExperience ? this.state.displayedExperience.description : ""}</p>
                        <button onClick={this.getNextExperience}>Next</button>
                        <button onClick={this.getPrevExperience}>Previous</button>
                    </div>
                    <h2>Total experiences</h2>
                    {this.state.listOfExperiences.length}

                    <div>
                        <h2>Doing</h2>
                    </div>
                </section>
            </div>
        )
    }
}

export default Dashboard;
