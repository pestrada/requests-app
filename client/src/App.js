import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestType: "recent",
      requests: []
    };
  }

  showRecent = () => {
    this.setState({requestType: "recent clicked"});
  }

  componentDidMount() {
    fetch('http://localhost:3000/requests').then((response) => {
      this.setState({requests: response.data});
    });
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React-Requests</h2>
        </div>

        <div>
          <Layout className="main-background">
              <Header transparent title="Requests" className="white">
                <Navigation>
                  <a href="">Recent</a>
                </Navigation>
              </Header>
              <Drawer title="Requests">
                <Navigation>
                  <a href="#" onClick={this.showRecent}>Recent</a>
                  <a href="">Approved</a>
                  <a href="">Rejected</a>
                </Navigation>
              </Drawer>
              <Content />
          </Layout>
        </div>
      </div>
    );
  }
}

export default App;
