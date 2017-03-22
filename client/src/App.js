import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Badge, Icon } from 'react-mdl';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Badge text="1" overlap>
          <Icon name="account_box" />
        </Badge>
      </div>
    );
  }
}

export default App;
