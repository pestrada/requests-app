import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Textfield } from 'react-mdl';

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
      <div>
        <Dialog open={this.props.openDialog}>
          <DialogTitle>What would you like to request?</DialogTitle>
          <DialogContent>
            <Textfield value={this.state.description} onChange={this.onChange} label="description..." floatingLabel style={{width: '200px'}} />
            <p>Chances of approval are higher if requests are voted up by your peers!</p>
          </DialogContent>
          <DialogActions>
            <Button type='button' onClick={this.handleClick}>Save</Button>
            <Button type='button' onClick={this.handleCloseDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
      );
  }

}

export default RequestDialog;