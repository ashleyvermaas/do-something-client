import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
    return (
        <div>
            <p>doSomething</p>
            <p><Link to={"/"}>Home</Link></p>
            { props.user ?
                <p><Link to={"/dashboard"}>Go to Dashboard</Link></p>
                :
                <div>
                    <p><Link to={"/login"}>Log in</Link></p>
                    <p><Link to={"/signup"}>Sign up</Link></p>
                </div>
            }
        </div>
    )
}

export default Navbar;