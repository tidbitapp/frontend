import React from 'react'
import 'regenerator-runtime/runtime';

import config from 'config';

import Input from 'react-toolbox/lib/input';
import {Button} from 'react-toolbox';

class LoginComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      formValid: false,
      loginDone: false,
      loginMessage: ''
    };
    this.login = this.login.bind(this);
  }

  onChangeHandler(name, newTextVal) {
    this.setState(Object.assign(
      this.state, {[name]: newTextVal}
    ));

    if (
      this.state.username.length > 0 &&
      this.state.password.length > 0) {
      this.setState(Object.assign(
        this.state, {formValid: true, loginDone: false}
      ));
    } else {
      this.setState(Object.assign(
        this.state, {formValid: false, loginDone: false}
      ));
    }
  }

  login() {
    fetch(config.baseApiUrl + '/authenticate', {
      method: 'POST',
      body: JSON.stringify({
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
                loginDone: true,
                loginMessage: parsedJsonBody.message
              }
            ));
          } catch (e) {
          }
        } else {
          this.setState(Object.assign(
            this.state,
            {
              loginDone: true,
              loginMessage: 'Success'
            }
          ));
          try {
            const parsedJsonBody = JSON.parse(response);
            this.props.loginHandler(parsedJsonBody.data);
          } catch (e) {
          }
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
          id='login'
          icon='done'
          disabled={!this.state.formValid || this.state.loginDone}
          raised accent
          onClick={this.login}>
          Log In
        </Button>
        {this.state.loginDone ? (
          <span id='loginMessage' style={{
            marginLeft: '10px'
          }}>{this.state.loginMessage}</span>
        ) : (
          <span></span>
        )}
      </div>
    )
  }

}

export default LoginComponent;
