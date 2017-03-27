import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import ListItem from './ListItem.js';

const url = 'http://localhost:3000/requests';

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
    fetch(`${url}/${params.requestType}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({requestType: params.requestType, requests: json.data});
      });
  }

  patchRequest = (request, callback) => {
    const body = JSON.stringify({type: request.type});
    const headers = new Headers({'Content-Type': 'application/json',});
    fetch(`${url}/${request.id}`, { method: 'PATCH', headers: headers, body: body})
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.showPending();
      });
  }

  approveRequest = (id) => {
    this.patchRequest({ id: id, type: 'approved'});
  }

  rejectRequest = (id) => {
    this.patchRequest({ id: id, type: 'rejected'});
  }

  componentDidMount() {
    this.showPending();
  }

  componentWillUnmount() {

  }

  render() {
    const listItems = this.state.requests.map((item) => {
      return (<ListItem description={item.description} requestType={item.type} key={item.id} id={item.id} approveRequest={this.approveRequest} rejectRequest={this.rejectRequest} />);
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
                  <a href="">{this.state.requestType.toUpperCase()}</a>
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
