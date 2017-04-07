import React, { Component } from 'react';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Image, Right, Grid, Col } from 'native-base';

class ListItem extends Component {

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
    const disabled = this.props.requestType !== 'pending';
    return (
        <Card style={{ flex: 0 }}>
            <CardItem>
                <Left>
                    <Body>
                        <Text>{this.props.description}</Text>
                    </Body>
                </Left>
            </CardItem>
            
            <CardItem>
                <Grid>
                    <Col>
                        <Button danger block style={{width: 100}} onPress={this.rejectRequest}>
                            <Text>Reject</Text>
                        </Button>
                    </Col>
                    <Col>
                        <Button success block style={{width: 100}} onPress={this.approveRequest}>
                            <Text>Approve</Text>
                        </Button>
                    </Col>
                    <Col>
                        <Button primary block style={{width: 100}} onPress={this.upvoteRequest}>
                        <Text>Vote</Text>
                    </Button>
                    </Col>
                </Grid>
            </CardItem>
            <CardItem>
                <Text note>{this.props.requestType}</Text>
                <Right>
                    <Button transparent textStyle={{color: '#87838B'}}>
                        <Icon name="md-star" />
                        <Text>{this.props.votes} votes</Text>
                    </Button>
                </Right>
            </CardItem>
        </Card>
    );
  }
}

export default ListItem;
