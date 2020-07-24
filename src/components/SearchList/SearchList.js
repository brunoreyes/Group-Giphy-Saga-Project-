import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchList extends Component {
  //   componentDidMount() {
  //     // use component did mount to dispatch an action to request the SearchList from the API
  //     this.props.dispatch({ type: 'FETCH_SEARCH' });
  //   }

  state = {
    url: '',
    // description:''
  };

  deleteSearch = (event) => {
    console.log(event.target.id);

    this.props.dispatch({
      type: 'DELETE_SEARCH',
      //   payload: this.props.searchItem.id,
      payload: event.target.id,
    });
  };

  favorite = (url) => {
    // Create an axios post request line an insert into favorite
    const payload = {url};
    console.log('change this!!!', payload)
    console.log('favorite pressed:', url);
    this.props.dispatch({
      type: 'SEND_FAVORITE',
      payload
    });
    //   url, description & id
  };

  render() {
    return (
      <div>
        <h3>Search Results</h3>
        {/* mapping each item within the array and them calling them searchItem */}
        <table>
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.reduxState.searchName.map((gif, arraySpot) => (
              <tr key={arraySpot}>
                <td>
                  <img src={gif.images.original.url}></img>
                  <button
                    onClick={() => this.favorite(gif.images.original.url)}
                  >
                    Favorite
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <pre>{JSON.stringify(this.props.reduxState.searchName)}</pre> */}
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapStateToProps)(SearchList);
