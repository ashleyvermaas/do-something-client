import React, { Component } from 'react'

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
            <div>
                <button onClick={this.toggleSearchbar}>Search</button>
                {this.state.showSearchbar ? <input type="text" name="search" value={this.state.searchInput} onChange={this.handleSearchInput} /> : null}
                
            </div>
        )
    }
}

export default Searchbar
