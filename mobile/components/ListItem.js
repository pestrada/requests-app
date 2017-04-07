import React, { Component } from 'react';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';

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
                        <Text note>{this.props.requestType}</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem>
                <Body>
                    <Text>
                        hola
                    </Text>
                    <Button transparent textStyle={{color: '#87838B'}}>
                        <Icon name="md-star" />
                        <Text>{this.props.votes} votes</Text>
                    </Button>
                </Body>
            </CardItem>
        </Card>
    );
  }
}

export default ListItem;
