import React, { Component } from 'react'

class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: ""
        }
    }

    handleSearchInput = (e) => {
        const value = e.target.value
        this.setState({
            searchInput: value
        });
        this.props.handleSearch(value)
    }

    render() {
        return (
            <div>
                Search 
                <input type="text" name="search" value={this.state.searchInput} onChange={this.handleSearchInput} />
            </div>
        )
    }
}

export default Searchbar
