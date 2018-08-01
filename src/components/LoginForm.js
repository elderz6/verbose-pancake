import React from 'react';
import { Form, Button, Label, Input } from 'semantic-ui-react';
import Validator from 'validator';
import LineError from './LineError';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
  constructor(props)
  {
    super(props);
    this.state =
    {
      data:{
        email:'',
        password:''
      },
      loading:false,
      errors:{}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e)
  {
    this.setState({
      data:
      {
        ...this.state.data, [e.target.name]: e.target.value
      }
    });
  }

  validate(data)
  {
    const errors = {};
    if (!Validator.isEmail(data.email))
    {
      errors.email = 'Invalid Email';
    }
    if (!data.password)
    {
      errors.password= 'Password cannot be empty';
    }
    return errors;
  }

  onSubmit()
  {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state.data);
    }
  }

  render () {
    const { data, errors } = this.state;
    return(
      <div>
        <Form onSubmit={this.onSubmit}>
          <Form.Field error={!!errors.email}>
            <Label>Email</Label>
            <Input
              type='text'
              id='email'
              name='email'
              placeholder='this@example.com'
              value={data.email}
              onChange={this.onChange}
            />
            {errors.email && <LineError text={ errors.email }/>}
          </Form.Field>

          <br />
          <br />

          <Form.Field error={!!errors.password}>
            <Label>Password</Label>
            <Input
              type='password'
              id='password'
              name='password'
              value={data.password}
              onChange={this.onChange}
            />
            {errors.password && <LineError text={ errors.password }/>}
          </Form.Field>

          <Button primary>
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  submit : PropTypes.func.isRequired
};

export default LoginForm;
