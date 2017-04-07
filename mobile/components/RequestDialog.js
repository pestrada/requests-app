import React from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

class RequestDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        description: ''
    };
  }

  onChange = (e) => {
    this.setState({description: e.target.value});
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
      <View style={{marginTop: 22}}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.openDialog}
          onRequestClose={this.handleCloseDialog}>

          <View style={{marginTop: 22}}>
            <View>
            <Text>Hello World!</Text>

            <TouchableHighlight onPress={this.handleCloseDialog}>
                <Text>Hide Modal</Text>
            </TouchableHighlight>

            </View>
          </View>
        </Modal>

      </View>
      );
  }

}

export default RequestDialog;