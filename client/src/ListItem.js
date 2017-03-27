import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions, CardMenu, Badge, Button } from 'react-mdl';

class App extends Component {

  componentDidMount() {
    
  }

  componentWillUnmount() {

  }

  approveRequest = () => {
    this.props.approveRequest(this.props.id);
  }

  rejectRequest = () => {
    this.props.rejectRequest(this.props.id);
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
            <Button raised colored className="action-button">Vote</Button>
          </div>
        </CardActions>
        <CardMenu className="white">
            <Badge text="4">votes</Badge>
        </CardMenu>
      </Card>
    );
  }
}

export default App;
