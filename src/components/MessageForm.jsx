import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as actionCreators from '../actions';
import { withUserName } from '../userNameContext';
import AutoFocusInput from './AutoFocusInput';

const mapStateToProps = state => ({
  currentChannelId: state.currentChannelId,
  sendingMessageState: state.sendingMessageState,
});

@connect(mapStateToProps, actionCreators)
@reduxForm({
  form: 'chatMessage',
})
@withUserName
class MessageForm extends React.Component {
  sendMessage = ({ message }) => {
    const {
      sendMessage, reset, currentChannelId, userName,
    } = this.props;
    const promise = new Promise((resolve) => {
      sendMessage(message, userName, currentChannelId, resolve);
    });
    return promise.then(() => {
      reset();
    });
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form action="" className="d-flex" onSubmit={handleSubmit(this.sendMessage)}>
        <div className="input-group">
          <AutoFocusInput submitting={submitting} />
          <div className="input-group-append">
            <button className="btn btn-success" type="submit" disabled={pristine || submitting}>
              {submitting ? <FontAwesomeIcon icon="spinner" spin /> : 'Send'}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default MessageForm;
