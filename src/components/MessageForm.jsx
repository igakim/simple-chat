import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as actionCreators from '../actions';
import { withUserName } from '../userNameContext';

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
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  componentDidMount() {
    this.input.current.getRenderedComponent().focus();
  }

  componentDidUpdate() {
    this.input.current.getRenderedComponent().focus();
  }

  sendMessage = ({ message }) => {
    const {
      sendMessage, currentChannelId, userName, reset,
    } = this.props;
    return sendMessage(message, userName, currentChannelId).then(() => reset());
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form action="" className="d-flex" onSubmit={handleSubmit(this.sendMessage)}>
        <div className="input-group">
          <Field
            type="text"
            name="message"
            component="input"
            className="form-control"
            autoComplete="off"
            ref={this.input}
            withRef
            required
            disabled={submitting}
          />
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
