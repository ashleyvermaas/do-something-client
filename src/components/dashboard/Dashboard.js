import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfActivities: [],
            randomActivity: "",
            listOfExperiences: [],
            counter: 0,
            displayedExperience: "",
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
        if (this.state.counter < this.state.listOfExperiences.length - 1) {
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
        return (
            <div className="page-container">
                <h1>Dashboard</h1>
                <h3>doSomething Random</h3>
                <section className="random-activity-section">
                    <Link to={`/activities/${this.state.randomActivity._id}`} className="text-link"><h4 className="random-activity-result">{this.state.randomActivity.title}</h4></Link>
                    <button onClick={this.getRandomActivity} className="random-btn">Get Random Activity</button>
                </section>

                <section className="dashboard-experiences">
                    <div>
                        <h3>Last experiences</h3>
                        <div className="experience-box last-experiences">
                            {this.state.displayedExperience ? <div className="last-experiences-content">
                                {this.state.displayedExperience.imageUrl ? <img src={this.state.displayedExperience.imageUrl} /> : <img src='/header-img.png'/> }
                                <div className="experience-box-text">
                                    <Link to={`/activities/${this.state.displayedExperience.activity}`} className="text-link"><p className="last-experiences-description">{this.state.displayedExperience.description}</p></Link>
                                </div>
                            </div>
                                : ""
                            }
                            <div >
                                <button onClick={this.getPrevExperience} className="navigation-btn" >Previous</button><button onClick={this.getNextExperience} className="navigation-btn">Next</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3>Total experiences</h3>
                        <div className="experience-box total-experiences">
                            {this.state.listOfExperiences.length}
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Dashboard;
