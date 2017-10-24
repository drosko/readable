import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Category from './Category';
import ViewPost from './ViewPost';
import PostAddEdit from './PostAddEdit';
import NotFound from './NotFound';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <Switch>
          <Route exact path='/' component={Home} />

          <Route exact path='/category/:id' component={Category} />

          <Route exact path='/post/add' component={PostAddEdit} />

          <Route exact path='/post/edit/:id' component={PostAddEdit} />

          <Route exact path='/post/view/:id' component={ViewPost} />

          <Route exact path='/notfound' component={NotFound} />

          <Route component={NotFound} />
      </Switch>
    );
  }
}

export default App;