import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class HomePage extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }
  render () {
    return(
      <div>
        <h1> Home Page </h1>
      { this.props.isAuthenticated
        ? <button> Logout</button>
        :  <Link to='/login'> Login </Link>}
      </div>
    );
  }
}

HomePage.propTypes =
{
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStatetoProps = state =>
{
  return{
    isAuthenticated: !!state.user.token
  }
}

export default connect(mapStatetoProps)(HomePage);
