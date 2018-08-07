import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConfirmEmailMessage from './ConfirmEmailMessage';


const DashboardPage = ({ isConfirmed }) => (
  <div>
    {
      !isConfirmed && <ConfirmEmailMessage />
    }
  </div>
)
DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired
};

const mapStateToProps = state =>
  ({isConfirmed:!!state.user.confirmed});

export default connect(mapStateToProps)(DashboardPage);
