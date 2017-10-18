import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Category from './Category';
import ViewPost from './ViewPost';
import PostAddEdit from './PostAddEdit';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div>
          <Route exact path='/' component={Home} />

          <Route path='/category/:id' component={Category} />

          <Route exact path='/post/add' component={PostAddEdit} />

          <Route exact path='/post/edit/:id' component={PostAddEdit} />

          <Route path='/post/view/:id' component={ViewPost} />
      </div>
    );
  }
}

export default App;