import React, { Component } from 'react'
import './Filter.css';

class Filter extends Component {
    state = {
        active: false,
        social: false,
        creative: false,
        relaxing: false,
        educational: false,
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
                    <div className="filter-form">
                        <input type="checkbox" id="active" name="active" onChange={(e) => this.handleFilterInput(e)} />
                        <label for="active" className="filter-label">Active</label>
                        <input type="checkbox" id="social" name="social" onChange={(e) => this.handleFilterInput(e)} />
                        <label for="social" className="filter-label">Social</label>
                        <input type="checkbox" id="relaxing" name="relaxing" onChange={(e) => this.handleFilterInput(e)} />
                        <label for="relaxing" className="filter-label">Relaxing</label>
                        <input type="checkbox" id="educational" name="educational" onChange={(e) => this.handleFilterInput(e)} />
                        <label for="educational" className="filter-label">Educational</label>
                        <input type="checkbox" id="creative" name="creative" onChange={(e) => this.handleFilterInput(e)} />
                        <label for="creative" className="filter-label">Creative</label>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

export default Filter;
