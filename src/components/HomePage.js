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

export class HomePage extends React.Component
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
      <Container>
        <div>
          {
            this.props.isAuthenticated
              ?
              (<Menu.Item onClick = {() => this.props.logout()}><Button> Logout </Button></Menu.Item>)
              :
              (<div>
                <Link to='/login'>
                  <Button id='logbtn'>
                    <Menu.Item>
                      Login
                    </Menu.Item>
                  </Button>
                </Link>
                <Link to='/signup'>
                  <Button id='signbtn'>
                    <Menu.Item>
                      Signup
                    </Menu.Item>
                  </Button>
                </Link>
              </div>
              )
          }
        </div>
        <Container>
          <h1> Home Page </h1>
          <article>
            lorem ipsum etc
            lorem ipsum etc
            lorem ipsum etc
            lorem ipsum etc
            lorem ipsum etc
            lorem ipsum etc
          </article>
        </Container>
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
