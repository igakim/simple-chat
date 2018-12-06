import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as actionCreators from '../actions';

const mapStateToProps = state => ({
  userName: state.userName,
  currentChannelId: state.currentChannelId,
  sendingMessageState: state.sendingMessageState,
});

@connect(mapStateToProps, actionCreators)
@reduxForm({
  form: 'chatMessage',
})
class MessageForm extends React.Component {
  componentDidMount() {
    this.input.getRenderedComponent().focus();
  }

  componentDidUpdate() {
    this.input.getRenderedComponent().focus();
  }

  sendMessage = ({ message }) => {
    const {
      sendMessage, reset, currentChannelId, userName,
    } = this.props;
    sendMessage(message, userName, currentChannelId);
    reset();
  }

  render() {
    const { handleSubmit, sendingMessageState } = this.props;
    const isDisabled = sendingMessageState === 'requested';
    return (
      <form action="" className="d-flex" onSubmit={handleSubmit(this.sendMessage)}>
        <div className="input-group">
          <Field type="text" name="message" component="input" className="form-control" autoComplete="off" ref={(c) => { this.input = c; }} withRef required disabled={isDisabled} />
          <div className="input-group-append">
            <button className="btn btn-success" type="submit" disabled={isDisabled}>
              {isDisabled ? <FontAwesomeIcon icon="spinner" spin /> : 'Send'}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default MessageForm;
