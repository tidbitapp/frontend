import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import {createHashHistory} from 'history'
import SignupComponent from 'SignupComponent';
import LoginComponent from 'LoginComponent';
import SearchComponent from 'SearchComponent';

import {
  AppBar,
  Navigation,
  Button,
  Layout,
  Panel
} from 'react-toolbox';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.history = createHashHistory();
    this.state = {
      isLoggedIn: false,
      token: ''
    };

    let token;
    try {
      token = localStorage.getItem('token');
    } catch (e) {
      token = null;
    }
    if (token) {
      this.state.isLoggedIn = true;
      this.state.token = token;
    }

    this.goBackHome = this.goBackHome.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  goBackHome() {
    this.history.push('/');
  }

  login(token) {
    this.setState(Object.assign(
      this.state,
      {
        isLoggedIn: true,
        token: token
      }
    ), () => {
      localStorage.setItem('token', token);
      this.goBackHome();
    });
  }

  logout() {
    this.setState(Object.assign(
      this.state,
      {
        isLoggedIn: false,
        token: ''
      }
    ), () => {
      localStorage.clear();
      this.goBackHome();
    });
  }

  render() {
    return (
      <Router history={this.history}>
        <Layout>
          <Panel>
            <AppBar title='Tidbit'
                    leftIcon='search'
                    onLeftIconClick={this.goBackHome}>
                {this.state.isLoggedIn ?
                  (
                    <Navigation type='horizontal'>
                      <Button icon='clear'
                              label='Logout'
                              onClick={this.logout}/>
                    </Navigation>
                  ) : (
                  <Navigation type='horizontal'>
                    <Link to='/login'>
                      <Button icon='account_circle' label='Login'/>
                    </Link>
                    <Link to='/signup'>
                      <Button icon='person' label='Sign Up'/>
                    </Link>
                  </Navigation>
                  )}
            </AppBar>
            <Switch>
              <Route path='/login' render={(props) => (
                <LoginComponent
                  {...props}
                  loginHandler={(token) => this.login(token)}
                />
              )}/>
              <Route path='/signup' component={SignupComponent}/>
              <Route render={(props) => (
                <SearchComponent
                  {...props}
                  isLoggedIn={this.state.isLoggedIn}
                  token={this.state.token}
                />
              )}/>
            </Switch>
          </Panel>
        </Layout>
      </Router>
    );
  }
}

ReactDOM.render(
  <Main/>,
  document.getElementById('app')
);
