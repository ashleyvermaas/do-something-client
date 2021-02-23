import React from 'react';
import Navbar from '../navbars/Navbar';
import { Link } from 'react-router-dom';

function Homepage(props) {
    return (
        <div>
            <Navbar user={props.user} />
            <hr></hr>
            <header>
                <h1>doSomething</h1>
                <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi corrupti magnam quidem cumque error, iste fugit in accusamus voluptatum perferendis atque maxime modi suscipit quam cum sapiente officia illum quibusdam!</h4>
                <Link to='/signup'><button>Get started</button></Link>
            </header>
            <hr></hr>
            <section>
                <h5>Some Awesome Text</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea ut repellendus nesciunt impedit perspiciatis provident non maiores aspernatur blanditiis quidem, placeat dolor exercitationem quam officiis ab quis harum dolores. Ipsam.</p>
            </section>
            <hr></hr>
            <footer>
                <div>A project by <a href="https://github.com/ashleyvermaas">Ashley Vermaas</a></div>
                <div>© 2021 Ashley Vermaas. All rights reserved.</div>
            </footer>
        </div>
    )
}
export default Homepage;