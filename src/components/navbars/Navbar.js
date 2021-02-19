import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div>
            <p>doSomething</p>
            <p><Link to={"/"}>Home</Link></p>
            <p><Link to={"/login"}>Log in</Link></p>
            <p><Link to={"/signup"}>Sign up</Link></p>
        </div>
    )
}

export default Navbar;