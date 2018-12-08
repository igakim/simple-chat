import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  channels: state.channels,
  currentChannelId: state.currentChannelId,
});

@connect(mapStateToProps)
class ChannelsList extends React.Component {
  getClasses = (channelId) => {
    const { currentChannelId } = this.props;
    return cn({
      'list-group-item': true,
      active: channelId === currentChannelId,
    });
  }

  render() {
    const { channels } = this.props;
    return (
      <ul className="list-group">
        {channels.map(({ id, name }) => <li key={id} className={this.getClasses(id)}>{name}</li>)}
      </ul>
    );
  }
}

export default ChannelsList;
