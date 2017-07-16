import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
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

  render() {
    return (
      <Router history={createBrowserHistory()}>
        <Layout>
          <Panel>
            <AppBar title='Tidbit'>
              <Navigation type='horizontal'>
                <Link to='/login'>
                  <Button icon='account_circle' label='Login' />
                </Link>
                <Link to='/signup'>
                  <Button icon='person' label='Sign Up'/>
                </Link>
              </Navigation>
            </AppBar>
            <Switch>
              <Route path='/login' component={LoginComponent}/>
              <Route path='/signup' component={SignupComponent}/>
              <Route component={SearchComponent}/>
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
