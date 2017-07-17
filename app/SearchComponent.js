import React from 'react';
import 'regenerator-runtime/runtime';

import config from 'config';

import {Card, CardTitle, CardText} from 'react-toolbox/lib/card';
import Button from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import FontIcon from 'react-toolbox/lib/font_icon';
import Input from 'react-toolbox/lib/input';

class SearchComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: '',
      summarizerType: 'FREQUENCY',
      formValid: false,
      summarizationProcessing: false,
      summarizationDone: false,
      summarizationMessage: '',
      summarizationData: {}
    };
    this.summarizeUrlContent = this.summarizeUrlContent.bind(this);
  }

  summarizeUrlContent() {
    const url = this.state.url;
    this.setState(Object.assign(
      this.state,
      {
        summarizationProcessing: true
      }
    ));

    fetch(config.baseApiUrl + '/summary', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.props.token
      },
      body: JSON.stringify({
        url: url,
        summarizerType: this.state.summarizerType
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
                summarizationProcessing: false,
                summarizationDone: true,
                summarizationMessage: parsedJsonBody.message,
                summarizationData: {}
              }
            ));
          } catch (e) {}
        } else {
          try {
            const parsedJsonBody = JSON.parse(response);
            this.setState(Object.assign(
              this.state,
              {
                summarizationProcessing: false,
                summarizationDone: true,
                summarizationMessage: 'Success',
                summarizationData: {
                  type: parsedJsonBody.data.summarizerType,
                  text: parsedJsonBody.data.summary.join(' ')
                }
              }
            ));
          } catch (e) {}
        }
      });
  }

  onChangeHandler(name, newTextVal) {
    this.setState(Object.assign(
      this.state, {[name]: newTextVal}
    ));

    if (
      this.state.url.length > 0 &&
      this.state.summarizerType.length > 0) {
      this.setState(Object.assign(
        this.state, {
          formValid: true,
          summarizationDone: false,
          summarizationData: ''
        }
      ));
    } else {
      this.setState(Object.assign(
        this.state, {
          formValid: false,
          summarizationDone: false,
          summarizationData: ''
        }
      ));
    }
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
          label='Enter a url of a site you would like to have summarized'
          name='url'
          value={this.state.url}
          onChange={this.onChangeHandler.bind(this, 'url')}/>
        <Dropdown
          auto
          onChange={this.onChangeHandler.bind(this, 'summarizerType')}
          source={[{
            label: 'Frequency',
            value: 'FREQUENCY'
          }, {
            label: 'Luhn',
            value: 'LUHN'
          }, {
            label: 'Sum Basic',
            value: 'SUMBASIC'
          }]}
          value={this.state.summarizerType}
        />

        {this.props.isLoggedIn ? '' : (
          <div style={{marginTop: '10px', marginBottom: '20px'}}>
            <FontIcon
              value='announcement'
              style={{marginRight: '10px'}}/>
            You must be logged in to request a summary
            <br/>
          </div>
        )}
        <Button
          icon='search'
          disabled={!this.props.isLoggedIn || this.state.summarizationProcessing}
          raised accent
          onClick={this.summarizeUrlContent}>
          {this.state.summarizationProcessing ? ('Processing') : ('Summarize')}
        </Button>
        {this.state.summarizationDone ? (
          <span style={{marginLeft: '10px'}}>
            {this.state.summarizationMessage}
          </span>
        ) : (
          <span></span>
        )}

        {this.state.summarizationDone && this.props.isLoggedIn ? (
          <div style={{marginTop: '20px'}}>
            <Card style={{margin: '10px'}}>
              <CardTitle
                title="Algorithm"
                subtitle="Summarization algorithm used"/>
              <CardText>{this.state.summarizationData.type}</CardText>
            </Card>
            <Card style={{margin: '10px'}}>
              <CardTitle
              title="Summary"
              subtitle="Summary obtained"/>
              <CardText>{this.state.summarizationData.text}</CardText>
            </Card>
          </div>
        ) : (<div></div>)
        }
      </div>
    );
  }

}

export default SearchComponent;
