import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Navbar from './components/navbars/Navbar';
import Sidebar from './components/navbars/Sidebar';
import ActivitiesList from './components/activities/ActivitiesList';
import ActivityDetails from './components/activities/ActivityDetails';
import AddActivity from './components/activities/AddActivity';

class App extends Component {
  state = {
    loggedInUser: null
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.loggedInUser ? <Sidebar user={this.state.loggedInUser} getUser={this.getTheUser} /> : <Navbar />}

        <Switch>
          <Route exact path="/signup" render={(props) => <Signup {...props} getUser={this.getTheUser} />} />

          <Route exact path="/login" render={(props) => <Login {...props} getUser={this.getTheUser} />} />

          <Route exact path="/activities" render={() => <ActivitiesList getUser={this.getTheUser} />} />

          <Route exact path="/activities/create" render={(props) => <AddActivity  {...props} getUser={this.getTheUser} />} />

          <Route exact path="/activities/:activityId" render={(props) => <ActivityDetails  {...props} getUser={this.getTheUser} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
