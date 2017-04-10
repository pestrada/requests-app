import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import {
  Button,
  Container,
  Content,
  Form,
  Input,
  Item
} from 'native-base';

class RequestDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        description: ''
    };
  }

  onChangeText = (text) => {
    this.setState({description: text});
  }

  handleClick = () => {
    this.props.saveRequest(this.state.description);
    this.setState({description: ''});
  }

  handleCloseDialog = () => {
    this.props.handleCloseDialog();
    this.setState({description: ''});
  }

  render() {
    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.openDialog}
          onRequestClose={this.handleCloseDialog}>

          <Container>
              <Content>
                <Form>
                  <Text style={styles.text}>What would you like to request?</Text>
                  <Item>
                    <Input value={this.state.description} onChangeText={this.onChangeText} placeholder="description..." />
                  </Item>
                  <Text style={styles.text}>Chances of approval are higher if requests are voted up by your peers!</Text>

                  <TouchableHighlight style={styles.btnSave}>
                    <Button primary block onPress={this.handleClick}>
                      <Text style={styles.white}>Save</Text>
                    </Button>
                  </TouchableHighlight>
                </Form>
              </Content>
            </Container>
        </Modal>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  btnSave: {
    marginLeft: 15,
    marginRight: 15
  },
  text: {
    marginBottom: 20,
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 15
  },
  white: {
    color: 'white'
  }
});

export default RequestDialog;