import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/semantic/semantic.min.css';
import App from './components/App';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import reducer from './reducers';
import { Provider } from 'react-redux';
import  thunk from 'redux-thunk';

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
    applyMiddleware(thunk)
  )
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>, div);
});
