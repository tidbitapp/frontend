import React from 'react';
import jwtDecode from 'jwt-decode';
import 'regenerator-runtime/runtime';

import config from 'config';

import {Card, CardTitle, CardText} from 'react-toolbox/lib/card';
import FontIcon from 'react-toolbox/lib/font_icon';

class UserHistoryComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      historyLoaded: false,
      history: []
    };
  }

  componentDidMount() {
    const decodedToken = jwtDecode(this.props.token);
    fetch(config.baseApiUrl + '/user/' + decodedToken.user_id, {
      headers: {
        'Authorization': 'Bearer ' + this.props.token
      }
    })
      .then(async (resp) => {
        let response = await resp.text();
        return {
          response: response,
          status: resp.status
        };
      })
      .then(({response, status}) => {
        if (status == 200) {
          try {
            const parsedJsonBody = JSON.parse(response);
            this.setState(Object.assign(
              this.state,
              {
                historyLoaded: true,
                history: parsedJsonBody.data.history
              }
            ));
          } catch (e) {}
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
        {this.props.isLoggedIn ? '' : (
          <div style={{marginTop: '10px', marginBottom: '20px'}}>
            <FontIcon
              value='announcement'
              style={{marginRight: '10px'}}/>
            You must be logged in to view your history
            <br/>
          </div>
        )}

        {this.state.historyLoaded && this.props.isLoggedIn ?
          this.state.history.map(({url, accessedAt}) => {
            return (<div key={accessedAt} style={{marginTop: '20px'}}>
              <Card style={{margin: '10px'}}>
                <CardTitle
                  title={url}
                  subtitle={accessedAt}/>
              </Card>
            </div>)
          }) : ('')
        }
      </div>
    );
  }

}

export default UserHistoryComponent;
