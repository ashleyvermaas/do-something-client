import React, { Component } from 'react';
import AuthService from '../services/auth-service';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import './Auth.css';

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
            .then((response) => {
                this.setState({
                    username: "",
                    email: "",
                    password: ""
                });
                this.props.setUser(response);
                this.props.history.push("/dashboard");
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
                <Navbar />
                <div className="auth-page">
                    <img src="/auth-img.png" alt="woman gardening" className="auth-page-img"/>
                    <div className="auth-page-text">
                        <h2>Create an account</h2>
                        <form onSubmit={this.handleFormSubmit}>
                            <label>Username:</label>
                            <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} className="auth-page-input" />

                            <label>Email:</label>
                            <input type="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)} className="auth-page-input" />

                            <label>Password:</label>
                            <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} className="auth-page-input" />

                            <input type="submit" value="Create account" className="auth-page-submit" />
                        </form>

                        <p>Already have an account? <Link to={"/login"} className="text-link auth-page-link">Log in</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;