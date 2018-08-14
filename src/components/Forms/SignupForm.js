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
      ...this.state,
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

  onSubmit()
  {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(errors =>
          this.setState(
            {
              errors:errors.response.data,
              loading:false
            })
        );
    }}

  render ()
  {
    const { data, errors, loading } = this.state;
    const err = { errors };
    const listErr = Object.keys( err ).map((i) => {
      return(<p key={ i }> { errors[i] } </p>)
    });
    return(
      <div>
        { console.log({errors}, listErr)}
        <Form onSubmit={this.onSubmit} loading={ loading } style={{padding:'20px'}}>
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
            { errors && <LineError  text={ listErr }/>}
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
