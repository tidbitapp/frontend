import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import Link from 'react-toolbox/lib/Link';

class Main extends React.Component {
  render() {
    return <AppBar title='Tidbit' leftIcon='menu'>
      <Navigation type='horizontal'>
        <Link href='http://' label='Sign Up' icon='inbox' />
        <Link href='http://' active label='Login' icon='person' />
      </Navigation>
    </AppBar>
  }
}

ReactDOM.render(
  <Main/>,
  document.getElementById('app')
);
