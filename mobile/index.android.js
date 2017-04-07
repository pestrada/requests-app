/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Grid, Col, Row } from 'native-base';
import ListItem from './components/ListItem.js';

const url = 'http://10.0.2.2:3000/requests';

export default class mobile extends Component {
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
      })
      .catch((error) => {
        console.error(error);
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
      <Container>
        <Header>
            <Left>
                <Button transparent>
                    <Icon name='menu' />
                </Button>
            </Left>
            <Body>
                <Title>Requests</Title>
            </Body>
            <Right />
        </Header>
        <Row style={{height: 50}}>
          <Col>
              <Button danger block transparent>
                  <Text>Pending</Text>
              </Button>
          </Col>
          <Col>
              <Button success block transparent>
                  <Text>Approved</Text>
              </Button>
          </Col>
          <Col>
              <Button primary block transparent>
              <Text>Rejected</Text>
          </Button>
          </Col>
        </Row>
        <Content>
            {listItems}
        </Content>
        <Footer>
            <FooterTab>
                <Button full>
                    <Text></Text>
                </Button>
            </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('mobile', () => mobile);
