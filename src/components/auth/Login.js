import React, { Component } from 'react';
import AuthService from '../services/auth-service';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import './Auth.css';

class Login extends Component {
    state = {
        email: "",
        password: ""
    }

    service = new AuthService();

    handleFormSubmit = (e) => {
        e.preventDefault();
        const email = this.state.email;
        const password = this.state.password;

        this.service.login(email, password)
            .then((response) => {
                this.setState({
                    email: "",
                    password: ""
                });
                this.props.setUser(response);
                this.props.history.push('/dashboard')
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
                        <h2>Welcome back!</h2>
                        <form onSubmit={this.handleFormSubmit}>
                            <label>Email:</label>
                            <input type="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)} className="auth-page-input" />

                            <label>Password:</label>
                            <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} className="auth-page-input" />

                            <input type="submit" value="Log in" className="auth-page-submit"/>
                        </form>

                        <p>Don't have an account yet? <Link to={"/signup"} className="text-link auth-page-link">Sign up</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;