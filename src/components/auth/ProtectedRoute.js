import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import './ProtectedRoute.css'

const ProtectedRoute = ({ component: Component, user, setUser, ...rest }) => {
    return (
        <Route {...rest}
            render={props => {
                if (user) {
                    return (<div className="protected-page">
                    <Sidebar setUser={setUser} />
                    <Component {...props} user={user} {...rest} />
                    </div>)
                } else {
                    return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                }
            }} />
    )
}

export default ProtectedRoute;