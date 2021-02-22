import React, { Component } from 'react';

class EditActivity extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Edit Activity</h1>
                <h1>{this.props.location.state.title}</h1>
            </div>
        )
    }
}

export default EditActivity;
