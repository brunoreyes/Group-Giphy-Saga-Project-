import React, { Component } from 'react';
import {connect} from 'react-redux'; // end imports


class Favorited extends Component {

    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_FAVORITES' });
    }

  render() {
    return (
      <div>
        <h1>Giphy Search!</h1>
        {JSON.stringify(this.props.reduxState.showGifs)}
        
      </div>
    ); // end return
  } // end render
} // end class

const mapStateToProps = (reduxState)=>({
    reduxState
})

export default connect(mapStateToProps)(Favorited);