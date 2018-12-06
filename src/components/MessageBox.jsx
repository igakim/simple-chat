import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  userName: state.userName,
  messages: state.messages,
});

@connect(mapStateToProps)
class MessageBox extends React.Component {
  componentDidMount() {
    this.messageBox.scrollTop = this.messageBox.scrollHeight;
  }

  componentDidUpdate() {
    this.messageBox.scrollTop = this.messageBox.scrollHeight;
  }

  render() {
    const { messages, userName } = this.props;
    return (
      <div className="message-box" ref={(c) => { this.messageBox = c; }}>
        {messages.map((m) => {
          const classes = cn({
            'user-name': true,
            'font-weight-bold': true,
            'mb-0': true,
            'text-danger': userName === m.userName,
          });
          const date = new Date(m.date);

          return (
            <div key={m.id}>
              <p className={classes}>
                {`${m.userName === userName ? 'You' : m.userName} `}
                <span className="timestamp font-italic text-muted font-weight-light">
                  <small>{date.toLocaleTimeString()}</small>
                </span>
              </p>
              <p className="message">
                {m.message}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default MessageBox;
