import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

class ConfirmEmailMessage extends React.Component {
  render () {
    return(
      <div>
        <Message info>
          <Message.Header>
            Please verify your E-mail
          </Message.Header>
        </Message>
      </div>);
  }
}

export default ConfirmEmailMessage;
