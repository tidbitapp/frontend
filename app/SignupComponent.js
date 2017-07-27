import React from 'react'
import 'regenerator-runtime/runtime';

import config from 'config';

import Input from 'react-toolbox/lib/input';
import {Button} from 'react-toolbox';


class SignupComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      formValid: false,
      signupDone: false,
      signupDoneMessage: ''
    };
    this.signup = this.signup.bind(this);
  }

  onChangeHandler(name, newTextVal) {
    this.setState(Object.assign(
      this.state, {[name]: newTextVal}
    ));

    if (
      this.state.username.length > 0 &&
      this.state.password.length > 0 &&
      this.state.firstName.length > 0 &&
      this.state.password.length > 0) {
      this.setState(Object.assign(
        this.state, {formValid: true, signupDone: false}
      ));
    } else {
      this.setState(Object.assign(
        this.state, {formValid: false, signupDone: false}
      ));
    }
  }

  signup() {
    fetch(config.baseApiUrl + '/user', {
      method: 'POST',
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(async (resp) => {
        let response = await resp.text();
        return {
          response: response,
          status: resp.status
        };
      })
      .then(({response, status}) => {
        if (status !== 200) {
          try {
            const parsedJsonBody = JSON.parse(response);
            this.setState(Object.assign(
              this.state,
              {
                signupDone: true,
                signupMessage: parsedJsonBody.message
              }
            ));
          } catch (e) {
          }
        } else {
          this.setState(Object.assign(
            this.state,
            {
              signupDone: true,
              signupMessage: 'Success'
            }
          ));
        }
      });
  }

  render() {
    return (
      <div style={{
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px'
      }}>
        <Input
          type='text'
          label='First Name'
          name='firstName'
          value={this.state.firstName}
          onChange={this.onChangeHandler.bind(this, 'firstName')}/>
        <Input
          type='text'
          label='Last Name'
          name='lastName'
          value={this.state.lastName}
          onChange={this.onChangeHandler.bind(this, 'lastName')}/>
        <Input
          type='text'
          label='Username'
          name='username'
          value={this.state.username}
          onChange={this.onChangeHandler.bind(this, 'username')}/>
        <Input
          type='password'
          label='Password'
          name='password'
          value={this.state.password}
          onChange={this.onChangeHandler.bind(this, 'password')}/>
        <Button
          id='signup'
          icon='done'
          disabled={!this.state.formValid || this.state.signupDone}
          raised accent
          onClick={this.signup}>
          Sign Up
        </Button>
        {this.state.signupDone ? (
          <span id='signupMessage' style={{
            marginLeft: '10px'
          }}>{this.state.signupMessage}</span>
        ) : (
          <span></span>
        )}
      </div>
    )
  }

}

export default SignupComponent;
