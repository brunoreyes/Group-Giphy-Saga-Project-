import React, { Component } from 'react';
import { connect } from 'react-redux'; // end imports

class Favorited extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_FAVORITES' });
  }

  updateCategory = (value, id) => {
    console.log('Select option chosen', value, 'gif-db-index: ', id);

    const payload = { value, id };
    this.props.dispatch({ type: 'SET_CATEGORY', payload });
  };

  render() {
    return (
      <div>
        <h1>Favorites!</h1>
        {this.props.reduxState.showGifs.map((gifs, index) => (
          <div key={index} id={gifs.id}>
            <img src={gifs.image_url}></img>
            <br></br>
            <label>Select Category: </label>
            <select
              onChange={(event) => {
                this.updateCategory(event.target.value, gifs.id);
              }}
            >
              <option value="NULL">--</option>
              <option value="1">funny</option>
              <option value="2">cohort</option>
              <option value="3">cartoon</option>
              <option value="4">nsfw</option>
              <option value="5">meme</option>
            </select>
            <br></br>
            <br></br>
          </div>
        ))}
      </div>
    ); // end return
  } // end render
} // end class

const mapStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapStateToProps)(Favorited);
