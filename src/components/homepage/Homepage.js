import React from 'react';
import Navbar from '../navbars/Navbar';

function Homepage(props) {
    return (
        <div>
        <Navbar user={props.user}/>
            <h1>Homepage</h1>
        </div>
    )
}
export default Homepage;