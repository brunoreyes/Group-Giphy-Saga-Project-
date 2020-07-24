import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {logger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {takeEvery, put} from 'redux-saga/effects';
import axios from 'axios'; // end imports
  
// ------------ THESE ARE OUR GENERATOR FUNCTIONS --------------
function* updateCategory(action) {
    try{
        //we need to get the data to updateCategory in here             
        console.log('in updateCategory');              
        const response = yield axios.put('/api/favorite', action.payload);
        yield console.log('In updateCategory', response);
        yield put ({ type: 'FETCH_FAVORITES'})
    }
    catch(error) {
        console.log( 'Trouble adding to category', error )
    }
}

function* getSearchSaga(action) {
  try {
    console.log('Searching with:', action.payload);

    const response = yield axios.get(
      `/api/category/search?searchName=${action.payload.name}`
    );

    // coming from search form
    yield put({ type: 'SET_SEARCH', payload: response.data });
  } catch (error) {
    console.log('error with Search get request:', error);
  } //end axios
} //end getSearchSaga

//generator function that makes a GET to 
function* getFavorites() {
    try{
        const response = yield axios.get('/api/favorite');
        yield console.log('This is what we get from axios.get: ', response.data);
        yield put ({ type: 'SET_FAVORITES', payload: response.data})
    }
    catch (error) {
        console.log( 'Trouble getting favorites', error )
    }
}

// ------------ THESE ARE OUR REDUCERS --------------

//this reducer holds the searched for name
const searchName = (state = [], action) => {
  if (action.type === 'SET_SEARCH') {
    return action.payload;
  }
  return state;
};

const favoriteName = (state = [], action) => {
  console.log('in favoriteName', action.payload);

  if (action.type === 'SEND_FAVORITE') {
    return action.payload;
  }
  return state;
};

const showGifs = (state=[], action) => {
    switch(action.type){
        case 'SET_FAVORITES':

            return action.payload;
        default:
            return state;
    }
}

// -------------------- Root/Watcher for the Sagas ---------------------
// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_SEARCH', getSearchSaga);
  yield takeEvery('FETCH_FAVORITES', getFavorites);
  yield takeEvery('SET_CATEGORY', updateCategory);
  // yield takeEvery('SEND_FAVORITE', favoriteSearchSaga);
  // yield takeEvery('DELETE_SEARCH', deleteSearchSaga);
} //end rootSaga

// -------------------- REDUX Store ---------------------
const storeInstance = createStore(
  combineReducers({
    showGifs,
    searchName,
    favoriteName
  }),
  applyMiddleware(sagaMiddleware, logger)
); // end store

// ---------------- apply saga middleware ------------------
const sagaMiddleware = createSagaMiddleware();
// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);


// -------------- connect redux store to app ---------------
ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById('react-root')
  //   Change react to react-root
);
// registerServiceWorker();

