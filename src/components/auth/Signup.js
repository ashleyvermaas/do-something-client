import React, { Component } from 'react';
import AuthService from '../services/auth-service';
import { Link } from 'react-router-dom'

class Signup extends Component {
    state = {
        username: '',
        email: '',
        password: ''
    }

    service = new AuthService()

    handleFormSubmit = (e) => {
        e.preventDefault();
        const username = this.state.username;
        const email = this.state.email;
        const password = this.state.password;

        this.service.signup(username, email, password)
        .then(response => {
            this.setState({
                username: "",
                email: "",
                password: ""
            });
            this.props.getUser(response);
            this.props.history.push("/");
        })
        .catch((error) => console.log(error))
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Username:</label>
                    <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />

                    <label>Email:</label>
                    <input type="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)} />

                    <label>Password:</label>
                    <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />

                    <input type="submit" value="Signup" />
                </form>

                <p>Already have an account? <Link to={"/"}>Login</Link></p>
            </div>
        )
    }
}

export default Signup;