import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message, Label, Input } from 'semantic-ui-react';
import Validator from 'validator';
import LineError from '../LineError';

class SignupForm extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      data: {
        email:'',
        password:'',
        confirmPassword:''
      },
      loading:false,
      errors:{}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validate = this.validate.bind(this);
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
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword= 'Passwords must match';
    }
    return errors;
  }

  onSubmit(e)
  {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch( err =>
          this.setState({
            errors : err.response.data.errors,
            loading:false
          }
          ));
    }
  }
  
  render ()
  {
    const { data, errors, loading } = this.state;
    return(
      <div>
        <Form onSubmit={this.onSubmit} loading={ loading } style={{padding:'20px'}}>
          { errors.global && (
            <Message negative>
              <Message.Header> Something went Wrong </Message.Header>
              <p>{ errors.global }</p>
            </Message>
          )}
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

          <Form.Field error={!!errors.confirmPassword}>
            <Label>Confirm Password</Label>
            <Input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              value={data.confirmPassword}
              onChange={this.onChange}
            />
            {errors.confirmPassword && <LineError text={ errors.confirmPassword }/>}
          </Form.Field>

          <Button primary>
            Sign Up
          </Button>
        </Form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SignupForm;
