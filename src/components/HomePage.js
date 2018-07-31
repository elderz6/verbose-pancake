import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  render () {
    return(
      <div>
        <h1> Home Page </h1>
        <Link to='/login'> Login </Link>
      </div>
    );
  }
}

export default HomePage;
