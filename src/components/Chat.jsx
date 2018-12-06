import React from 'react';
import { reduxForm, Field } from 'redux-form';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

const mapStateToProps = state => ({
  userName: state.userName,
  messages: state.messages,
  sendingMessageState: state.sendingMessageState,
});


@connect(mapStateToProps, actionCreators)
@reduxForm({
  form: 'chatMessage',
})
class Chat extends React.Component {
  sendMessage = ({ message }) => {
    const { sendMessage, reset, userName } = this.props;
    sendMessage(message, userName);
    reset();
  }

  render() {
    const {
      messages, handleSubmit, userName, sendingMessageState,
    } = this.props;
    const isDisabled = sendingMessageState === 'requested';
    return (
      <div className="card">
        <div className="card-header">
          <h3>Chat</h3>
        </div>
        <div className="card-body">
          {messages.map((m) => {
            const classes = cn({
              'user-name': true,
              'font-weight-bold': true,
              'text-danger': userName === m.userName,
            });
            return (
              <p key={m.id}>
                <span className={classes}>
                  {`${m.userName === userName ? 'You' : m.userName}: `}
                </span>
                {m.message}
              </p>
            );
          })}
        </div>
        <div className="card-footer">
          <form action="" className="d-flex" onSubmit={handleSubmit(this.sendMessage)}>
            <div className="input-group">
              <Field type="text" name="message" component="input" className="form-control" required disabled={isDisabled} />
              <div className="input-group-append">
                <button className="btn btn-success" type="submit" disabled={isDisabled}>
                  {isDisabled ? <FontAwesomeIcon icon="spinner" spin /> : 'Send'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
