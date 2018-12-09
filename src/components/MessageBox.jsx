import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { withUserName } from '../userNameContext';

const getMessages = state => state.messages;

const getCurrentChannelId = state => state.currentChannelId;

const chanelMessages = createSelector(
  getMessages,
  getCurrentChannelId,
  (messages, id) => messages.filter(el => el.channelId === id),
);

const mapStateToProps = state => ({
  messages: chanelMessages(state),
});

@connect(mapStateToProps)
@withUserName
class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.messageBox = React.createRef();
  }

  componentDidMount() {
    this.messageBox.current.scrollTop = this.messageBox.current.scrollHeight;
  }

  componentDidUpdate() {
    this.messageBox.current.scrollTop = this.messageBox.current.scrollHeight;
  }

  getClasses = (currentUserName) => {
    const { userName } = this.props;
    return cn({
      'user-name': true,
      'font-weight-bold': true,
      'mb-0': true,
      'text-danger': userName === currentUserName,
    });
  }

  getDate = dateString => new Date(dateString).toLocaleTimeString()

  render() {
    const { messages, userName } = this.props;
    return (
      <div className="message-box" ref={this.messageBox}>
        {messages.map(m => (
          <div key={m.id}>
            <p className={this.getClasses(m.userName)}>
              {`${m.userName === userName ? 'You' : m.userName} `}
              <span className="timestamp font-italic text-muted font-weight-light">
                <small>{this.getDate(m.date)}</small>
              </span>
            </p>
            <p className="message">
              {m.message}
            </p>
          </div>
        ))}
      </div>
    );
  }
}

export default MessageBox;
