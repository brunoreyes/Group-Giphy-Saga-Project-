import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {logger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {takeEvery, put} from 'redux-saga/effects';
import axios from 'axios'; // end imports

//create a store
//wrap app 

// Main generator function
function* watcherSaga() {
    yield takeEvery('FETCH_FAVORITES', getFavorites)
}// end watcherSaga
  
//generator function that makes a GET to 
function* getFavorites() {
    try{
        const response = axios.get('/api/favorite');
        yield console.log('This is what we get from axios.get: ', response);
        yield put ({ type: 'SET_FAVORITES', payload: response.data})
    }
    catch (error) {
        console.log( 'Trouble getting favorites', error )
    }
}

const showGifs = (state=[], action) => {
    switch(action.type){
        case 'SET_FAVORITES':
            return action.payload;
        default:
            return state;
    }
}


const sagaMiddleware = createSagaMiddleware();

// This will be used to store our reducers so that they 
// will be accessible to other components
const store = createStore(
  combineReducers({
    showGifs
  }),
  applyMiddleware(sagaMiddleware, logger)
); // end store

sagaMiddleware.run(watcherSaga);


ReactDOM.render(<Provider store={store}><App /></Provider>, 
    document.getElementById('react-root'));
