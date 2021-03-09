import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";

function Navbar(props) {
    return (
        <nav className="navbar">
            <Link to={"/"} className='text-link'><h3 className="navbar-logo">doSomething</h3></Link>
            { props.user ?
                <Link to={"/dashboard"} className='text-link'><p className="navbar-dashboard">Go to Dashboard</p></Link>
                :
                <div className="navbar-auth">
                    <Link to={"/login"} className='text-link'><p className="navbar-login">Log in</p></Link>
                    <Link to={"/signup"} className='text-link'><p className="navbar-signup">Sign up</p></Link>
                </div>
            }
        </nav>
    )
}

export default Navbar;