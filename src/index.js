import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/semantic/semantic.min.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import reducer from './reducers';
import { Provider } from 'react-redux';
import  thunk from 'redux-thunk';

const logger = store => next => action => {
  console.log(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd(action.type);
  return result;  
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  categories: [],
  posts: {
    currentViewingPost: null,
    postsMap: {}
  },
  comments: {
    currentViewingComments: [],
    commentMapCount: {}
  }
}

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(
    applyMiddleware(thunk, logger)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root'));

registerServiceWorker();
