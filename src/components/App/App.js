import React, { Component } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import SearchList from '../SearchList/SearchList';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    console.log('component mount');
  }

  render() {
    return (
      <div>
        <h1>Giphy Search!</h1>
        <SearchForm />
        <SearchList />
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxState) => ({
  reduxState,
});

export default connect(putReduxStateOnProps)(App);
