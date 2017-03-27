import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions, CardMenu, Badge, Button } from 'react-mdl';

class App extends Component {

  componentDidMount() {
    
  }

  componentWillUnmount() {

  }

  approveRequest = () => {
    this.props.approveRequest({id: this.props.id, type: 'approved', votes: this.props.votes});
  }

  rejectRequest = () => {
    this.props.rejectRequest({id: this.props.id, type: 'rejected', votes: this.props.votes});
  }

  upvoteRequest = () => {
    this.props.upvoteRequest({id: this.props.id, type: this.props.requestType, votes: this.props.votes + 1});
  }

  render() {
    return (
      <Card shadow={0} className="card">
        <CardTitle className="card-title"></CardTitle>
        <CardText>
          {this.props.description}
        </CardText>
        <CardActions border>
          <div>
            <Button raised colored className="action-button" onClick={this.rejectRequest}>Reject</Button>
            <Button raised colored className="action-button" onClick={this.approveRequest}>Approve</Button> 
            <Button raised colored className="action-button" onClick={this.upvoteRequest}>Vote</Button>
          </div>
        </CardActions>
        <CardMenu className="white">
            <Badge text={this.props.votes}>votes</Badge>
        </CardMenu>
      </Card>
    );
  }
}

export default App;
