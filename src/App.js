import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Navbar from './components/navbars/Navbar';
import Sidebar from './components/navbars/Sidebar';

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
        {this.state.loggedInUser ?  <Sidebar /> : <Navbar />}
        
        <Switch>
          <Route exact path="/signup" render={() => <Signup getUser={this.getTheUser} />} />

          <Route exact path="/login" render={() => <Login getUser={this.getTheUser} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
