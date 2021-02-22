import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Switch, Route, Redirect } from 'react-router-dom';

import Homepage from './components/homepage/Homepage';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Navbar from './components/navbars/Navbar';
import Sidebar from './components/navbars/Sidebar';
import Dashboard from './components/dashboard/Dashboard'
import ActivitiesList from './components/activities/ActivitiesList';
import ActivityDetails from './components/activities/ActivityDetails';
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
          <Route exact path="/" render={() => <Homepage />} />

          <Route exact path="/signup" render={(props) => <Signup {...props} getUser={this.getTheUser} />} />

          <Route exact path="/login" render={(props) => <Login {...props} getUser={this.getTheUser} />} />

          <ProtectedRoute user={this.state.loggedInUser} exact path="/dashboard"  component={Dashboard} />

          <ProtectedRoute user={this.state.loggedInUser} exact path="/activities" component={ActivitiesList} />

          <ProtectedRoute user={this.state.loggedInUser} exact path="/activities/create"  component={AddActivity} />

          <ProtectedRoute user={this.state.loggedInUser} exact path="/activities/:activityId" component={ActivityDetails} />
        </Switch>
      </div>
    );
  }
}

export default App;
// render={() => <ActivitiesList getUser={this.getTheUser} />}

//render={(props) => <AddActivity  {...props} getUser={this.getTheUser} />}