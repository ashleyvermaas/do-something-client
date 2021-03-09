import React, { Component } from 'react'
import './Searchbar.css';

class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: "",
            showSearchbar: false
        }
    }

    handleSearchInput = (e) => {
        const value = e.target.value
        this.setState({
            searchInput: value
        });
        this.props.handleSearch(value)
    }

    toggleSearchbar = () => {
        this.state.showSearchbar ? this.setState({ showSearchbar: false }) : this.setState({ showSearchbar: true })
    }

    render() {
        return (
            <div className="searchbar">
                <p onClick={this.toggleSearchbar} className="search-btn">Search</p>
                {this.state.showSearchbar ? <input type="text" name="search" value={this.state.searchInput} onChange={this.handleSearchInput} className="searchbar-input"/> : null}
            </div>
        )
    }
}

export default Searchbar
