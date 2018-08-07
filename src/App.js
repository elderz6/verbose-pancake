import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';

class App extends Component {
  render() {
    return (
      <div className='ui container'>
        <Route path='/' exact component={ HomePage }/>
        <Route path='/login' exact component={ LoginPage }/>
        <Route path='/dashboard' exact component={ DashboardPage }/>
      </div>
    );
  }
}

export default App;
