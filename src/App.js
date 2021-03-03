import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Switch, Route, Redirect } from 'react-router-dom';

import Homepage from './components/homepage/Homepage';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

import Navbar from './components/navbars/Navbar';
import Sidebar from './components/navbars/Sidebar';

import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';

import ActivitiesList from './components/activities/ActivitiesList';
import ActivityDetails from './components/activities/ActivityDetails';
import EditActivity from './components/activities/EditActivity.js';
import AddActivity from './components/activities/AddActivity';


import ProtectedRoute from './components/auth/ProtectedRoute';

class App extends Component {
  state = {
    loggedInUser: null
  }

  setTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }


  updateUserDetails = (username, email, imageUrl) => {
    this.setState(prevState => ({
      loggedInUser: {
        ...prevState.loggedInUser,
        username: username,
        email: email,
        imageUrl: imageUrl
      }
    }))
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Homepage user={this.state.loggedInUser} />} />

          <Route exact path="/signup" render={(props) => <Signup {...props} setUser={this.setTheUser} />} />

          <Route exact path="/login" render={(props) => <Login {...props} setUser={this.setTheUser} />} />

          <ProtectedRoute user={this.state.loggedInUser} exact path="/dashboard" component={Dashboard} setUser={this.setTheUser} />

          <ProtectedRoute user={this.state.loggedInUser} exact path="/my-profile" component={Profile} setUser={this.setTheUser} updateUserDetails={this.updateUserDetails} />

          <ProtectedRoute user={this.state.loggedInUser} exact path="/activities" component={ActivitiesList} setUser={this.setTheUser} />

          <ProtectedRoute user={this.state.loggedInUser} exact path="/activities/:activityId" component={ActivityDetails} setUser={this.setTheUser} />

        </Switch>
      </div>
    );
  }
}

export default App;