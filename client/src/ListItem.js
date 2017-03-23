import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions, CardMenu, IconButton, Badge, Button } from 'react-mdl';

class App extends Component {
  constructor(props) {
    super(props);;
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {

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
            <IconButton colored ripple name="add" className="action-button" />
            <Button raised colored className="action-button">Approve</Button>
            <Button raised colored className="action-button">Reject</Button>
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
