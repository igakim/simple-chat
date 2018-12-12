import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

const mapStateToProps = () => ({});

@reduxForm({
  form: 'channelName',
})
@connect(mapStateToProps, actionCreators)
class AddChannelModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  addChannel = async ({ name }) => {
    const { addChannel, reset } = this.props;
    await addChannel(name);
    reset();
    this.handleClose();
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const { show } = this.state;
    const {
      handleSubmit, submitting, pristine,
    } = this.props;
    return (
      <>
        <Button variant="success" onClick={this.handleShow} size="sm" className="align-self-center">
          <FontAwesomeIcon icon="plus" />
        </Button>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Channel</Modal.Title>
          </Modal.Header>
          <form action="" onSubmit={handleSubmit(this.addChannel)}>
            <Modal.Body>
              <h5>New Channel Name:</h5>
              <Field type="text" name="name" component="input" className="form-control" autoComplete="off" required />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" disabled={pristine || submitting}>
                {submitting ? <FontAwesomeIcon icon="spinner" spin /> : 'Add Channel'}
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  }
}

export default AddChannelModal;
