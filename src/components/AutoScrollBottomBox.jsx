import React from 'react';

export default class AutoScrollBottomBox extends React.Component {
  componentDidMount() {
    this.messageBox.scrollTop = this.messageBox.scrollHeight;
  }

  componentDidUpdate() {
    this.messageBox.scrollTop = this.messageBox.scrollHeight;
  }

  render() {
    const { children } = this.props;
    return (
      <div className="message-box" ref={(el) => { this.messageBox = el; }}>
        {children}
      </div>
    );
  }
}
