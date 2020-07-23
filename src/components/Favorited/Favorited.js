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
        {                             
          this.props.reduxState.showGifs.map((gifs, index)=>
            <img key={index} src={gifs.image_url}></img>)
        }
        
        
      </div>
    ); // end return
  } // end render
} // end class



const mapStateToProps = (reduxState)=>({
    reduxState
})

export default connect(mapStateToProps)(Favorited);