import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConfirmEmailMessage from './ConfirmEmailMessage';


class DashboardPage extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      isConfirmed: false
    };
  }

  render () {
    const {isConfirmed} = this.state;
    return(
      <div>
        <h1> Dashboard </h1>
        {
          !isConfirmed && <ConfirmEmailMessage />
        }
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired
};

const mapStateToProps = state =>
  ({isConfirmed:!!state.user.confirmed});

export default connect(mapStateToProps)(DashboardPage);
