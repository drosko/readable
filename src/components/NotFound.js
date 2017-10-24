import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import TopBar from './TopBar';

class NotFound extends Component {

  render() {
    return (
      <div className="App">
        <TopBar />
        <Container className='container-mod'>
          <h2>Page Not Found :-( </h2>        
        </Container>
      </div>
    );
  }

}

export default NotFound;
