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

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Homepage user={this.state.loggedInUser} />} />

          <Route exact path="/signup" render={(props) => <Signup {...props} getUser={this.getTheUser} />} />

          <Route exact path="/login" render={(props) => <Login {...props} getUser={this.getTheUser} />} />

          <ProtectedRoute user={this.state.loggedInUser} exact path="/dashboard" component={Dashboard} getUser={this.getTheUser}/>

          <ProtectedRoute user={this.state.loggedInUser} exact path="/my-profile" component={Profile} getUser={this.getTheUser}/>

          <ProtectedRoute user={this.state.loggedInUser} exact path="/my-profile/edit" component={EditProfile} getUser={this.getTheUser}/>

          <ProtectedRoute user={this.state.loggedInUser} exact path="/activities" component={ActivitiesList} getUser={this.getTheUser}/>

          <ProtectedRoute user={this.state.loggedInUser} exact path="/activities/create" component={AddActivity} getUser={this.getTheUser}/>

          <ProtectedRoute user={this.state.loggedInUser} exact path="/activities/:activityId" component={ActivityDetails} getUser={this.getTheUser}/>

          <ProtectedRoute user={this.state.loggedInUser} exact path="/activities/:activityId/edit" component={EditActivity} getUser={this.getTheUser}/>

        </Switch>
      </div>
    );
  }
}

export default App;