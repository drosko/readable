import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Dropdown, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


class TopBar extends Component {

  render() {
    console.log(this.props);
    return (
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a' header>
            Readable
          </Menu.Item>
          
          <Link to='/' className='item'>Home</Link>
          <Dropdown item simple text='Categories'>
            <Dropdown.Menu>
              {
                this.props.categories.map((cat) => (
                  <Link to={'/category/' + cat.path} className='item' key={cat.name}>{cat.name}</Link>
                ))
              }
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Menu>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  }
}

export default connect(mapStateToProps, null)(TopBar);