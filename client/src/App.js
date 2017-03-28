import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout, Header, Navigation, Drawer, Content, Button } from 'react-mdl';
import ListItem from './ListItem.js';
import RequestDialog from './RequestDialog.js';

const url = 'http://localhost:3000/requests';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestType: "pending",
      requests: [],
      openDialog: false
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
    const body = JSON.stringify(request);
    const headers = new Headers({'Content-Type': 'application/json',});
    fetch(`${url}/${request.id}`, { method: 'PATCH', headers: headers, body: body})
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        callback ? callback() : this.showPending();
      });
  }
  
  postRequest = (request, callback) => {
    const body = JSON.stringify(request);
    const headers = new Headers({'Content-Type': 'application/json',});
    fetch(`${url}`, { method: 'POST', headers: headers, body: body})
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        callback ? callback() : this.showPending();
      });
  }

  approveRequest = (request) => {
    this.patchRequest(request);
  }

  rejectRequest = (request) => {
    this.patchRequest(request);
  }

  upvoteRequest = (request) => {
    this.patchRequest(request, this.refreshRequests);
  }

  refreshRequests = () => {
    const method = 'show' + this.state.requestType.charAt(0).toUpperCase() + this.state.requestType.slice(1).toLowerCase();
    this[method]();
  }

  saveRequest = (description) => {
    this.postRequest({description: description}, () => {
      this.handleCloseDialog();
      this.showPending();
    });
  }

  handleOpenDialog = () => {
    this.setState({
      openDialog: true
    });
  }

  handleCloseDialog = () => {
    this.setState({
      openDialog: false
    });
  }

  componentDidMount() {
    this.showPending();
  }

  componentWillUnmount() {

  }

  render() {
    const listItems = this.state.requests.map((item) => {
      return (<ListItem 
        description={item.description} 
        requestType={item.type} 
        key={item._id} 
        id={item._id} 
        votes={item.votes} 
        approveRequest={this.approveRequest} 
        rejectRequest={this.rejectRequest}
        upvoteRequest={this.upvoteRequest} />);
    });

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React-Requests</h2>
        </div>

        <div>
          <Layout fixedDrawer>
              <Header title={'Requests - ' + this.state.requestType.toUpperCase()}>
                <Navigation>
                  <Button raised accent ripple id="action-new" onClick={this.handleOpenDialog}>New Request</Button>
                  <RequestDialog openDialog={this.state.openDialog} handleCloseDialog={this.handleCloseDialog} saveRequest={this.saveRequest}></RequestDialog>
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
