import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { logout } from '../actions/auth';


class HomePage extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      isAuthenticated: true
    };
  }

  render () {
    return(
      <div>
        <h1> Home Page </h1>
      {
        this.props.isAuthenticated
        ?
        (<Button onClick = {() => this.props.logout() }> Logout</Button>)
        :
        (<Link to='/login'> Login </Link>)
      }
      </div>
    );
  }
}

HomePage.propTypes =
{
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStatetoProps = state =>
{
  return{
    isAuthenticated: !!state.user.token
  }
}

export default connect(mapStatetoProps, { logout })(HomePage);
