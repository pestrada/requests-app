import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import ListItem from './ListItem.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestType: "pending",
      requests: []
    };
  }

  showPending = () => {
    this.loadRequests({requestType: 'pending'});
  }

  showApproved = () => {
    this.loadRequests({requestType: 'approved'});
  }

  showRejected = () => {
    this.loadRequests({requestType: 'rejected'});
  }

  loadRequests = (params) => {
    fetch(`http://localhost:3000/requests/${params.requestType}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({requests: json.data});
      });
  }

  componentDidMount() {
    this.showPending();
  }

  componentWillUnmount() {

  }

  render() {
    const listItems = this.state.requests.map((item) => {
      return (<ListItem description={item.description} requestType={item.type} key={item.id} />);
    });

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React-Requests</h2>
        </div>

        <div>
          <Layout fixedDrawer>
              <Header title="Requests" >
                <Navigation>
                  <a href="" onClick={this.showPending}>Pending</a>
                </Navigation>
              </Header>
              <Drawer title="">
                <Navigation>
                  <a href="#" onClick={this.showPending}>Pending</a>
                  <a href="#" onClick={this.showApproved}>Approved</a>
                  <a href="#" onClick={this.showRejected}>Rejected</a>
                </Navigation>
              </Drawer>
              <Content>
                {listItems}
              </Content>
          </Layout>
        </div>
      </div>
    );
  }
}

export default App;
