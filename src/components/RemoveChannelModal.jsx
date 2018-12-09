import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

const mapStateToProps = () => ({});


@connect(mapStateToProps, actionCreators)
class RemoveChannelModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  removeChannel = id => () => {
    const { removeChannel } = this.props;
    removeChannel(id);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const { show } = this.state;
    const { id } = this.props;
    return (
      <>
        <Button variant="danger" onClick={this.handleShow}>
          <FontAwesomeIcon icon="trash-alt" />
        </Button>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>You want to remove channel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You are going to delete the channel forever. This action cannot be undone.</p>
            <p>Are you sure?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="danger" type="submit" onClick={this.removeChannel(id)}>
              Yes, remove
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default RemoveChannelModal;
