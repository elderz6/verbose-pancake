import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Button,
  Menu,
  Container
} from 'semantic-ui-react';
import { logout } from '../actions/auth';
import MenuComp from './Menu';

class HomePage extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      visible:false,
      isAuthenticated: true
    };
  }

  render () {
    return(
      <Container style={{margin: '20px'}}>
        <MenuComp />
        <h1> Home Page </h1>

        {
          this.props.isAuthenticated
            ?
            (<Menu.Item onClick = {() => this.props.logout() }> Logout</Menu.Item>)
            :
            (<div>
              <Link to='/login'>
                <Button>
                  <Menu.Item>
                    Login
                  </Menu.Item>
                </Button>
              </Link>
              <Link to='/signup'>
                <Button>
                  <Menu.Item>
                    Signup
                  </Menu.Item>
                </Button>
              </Link>
            </div>
            )
        }
      </Container>
    );
  }
}

HomePage.propTypes =
{
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStatetoProps = state =>
{
  return{
    isAuthenticated: !!state.user.token
  };
};

export default connect(mapStatetoProps, { logout })(HomePage);
