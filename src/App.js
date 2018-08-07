import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import PropTypes from 'prop-types';

const App = ({ location }) => (
  <div className='ui container'>
    <Route location={location} path='/' exact component={ HomePage }/>
    <GuestRoute location={location} path='/login' exact component={ LoginPage }/>
    <UserRoute location={location} path='/dashboard' exact component={ DashboardPage }/>
  </div>
);

App.propTypes ={
  location:PropTypes.shape({
    pathname:PropTypes.string.isRequired
  }).isRequired
};

export default App;
