import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { response } from 'express';
// import { response } from 'express';
// When prototype isn't working it could be because stupid express autocompleted in our form

// const { default: Axios } = require('axios');

const mapStateToProps = (reduxState) => ({
  reduxState,
});

class SearchForm extends Component {
  state = {
    name: '',
  };

  handleNameChange = (event, propertyName) => {
    event.preventDefault();

    console.log('event happened');
    this.setState({
      ...this.state,
      [propertyName]: event.target.value,
    });
  };

  addNewSearch = (event) => {
    event.preventDefault();

    let payload = this.state;
    console.log('Payload sent to addnewsearch:', payload);
    this.props.dispatch({ type: 'FETCH_SEARCH', payload });
    this.setState({
      name: '',
    });
  };

  render() {
    return (
      <div>
        <h3>This is the Search form</h3>
        {/* <pre>{JSON.stringify(this.state)}</pre> */}
        <form onSubmit={this.addNewSearch}>
          <input
            type="text"
            value={this.state.name}
            onChange={(event) => this.handleNameChange(event, 'name')}
            placeholder="name"
          />
          {/* <pre>{JSON.stringify(this.props.reduxState)}</pre> */}

          <input type="submit" value="Add New Search" />
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(SearchForm);
