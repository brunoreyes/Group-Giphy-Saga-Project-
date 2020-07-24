import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.js';
// import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_SEARCH', getSearchSaga);
  //   yield takeEvery('SEND_FAVORITE', favoriteSearchSaga);
  // yield takeEvery('DELETE_SEARCH', deleteSearchSaga);
} //end rootSaga

// Reducer that holds our results

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

// function* favoriteSearchSaga(action) {
//   // here we are posting info to our database
//   axios.get;
// }

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

const sagaMiddleware = createSagaMiddleware();

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({ searchName, favoriteName }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById('react-root')
  //   Change react to react-root
);
// registerServiceWorker();
