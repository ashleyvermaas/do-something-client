import React, { Component } from 'react';
import AuthService from '../services/auth-service';
import { Link } from 'react-router-dom';
import Navbar from '../navbars/Navbar';

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
                this.props.getUser(response);
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
            <h2>Welcome back!</h2>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Email:</label>
                    <input type="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)} />

                    <label>Password:</label>
                    <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />

                    <input type="submit" value="Log in" />
                </form>

                <p>Don't have an account yet? <Link to={"/signup"}>Sign up</Link></p>
            </div>
        )
    }
}

export default Login;