import React, { Component } from 'react'

class Filter extends Component {
    state = {
        active: false,
        social: false,
        creative: false,
        funny: false,
        showForm: false
    }

    toggleForm = () => {
        this.state.showForm ? this.setState({ showForm: false }) : this.setState({ showForm: true })
    }

    handleFilterInput = (e) => {
        const { name } = e.target;
        this.setState((prevState) => {
            return {
                [name]: !prevState[name]
            }
        }, () => this.props.handleActivityFilter(this.state));
    }

    render() {
        return (
            <div className="filter">
                <p onClick={this.toggleForm} className="filter-btn">Filter</p>

                {this.state.showForm ?
                    <div>
                        <input type="checkbox" id="active" name="active" onChange={(e) => this.handleFilterInput(e)} />
                        <label for="active">Active</label>
                        <input type="checkbox" id="social" name="social" onChange={(e) => this.handleFilterInput(e)} />
                        <label for="social">Social</label>
                        <input type="checkbox" id="funny" name="funny" onChange={(e) => this.handleFilterInput(e)} />
                        <label for="funny">Funny</label>
                        <input type="checkbox" id="creative" name="creative" onChange={(e) => this.handleFilterInput(e)} />
                        <label for="creative">Creative</label>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

export default Filter;
