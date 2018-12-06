import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  channels: state.channels,
  currentChannelId: state.currentChannelId,
});

@connect(mapStateToProps)
class ChannelsList extends React.Component {
  render() {
    const { channels, currentChannelId } = this.props;
    return (
      <ul className="list-group">
        {channels.map(({ id, name }) => {
          const classes = cn({
            'list-group-item': true,
            active: id === currentChannelId,
          });
          return <li key={id} className={classes}>{name}</li>;
        })}
      </ul>
    );
  }
}

export default ChannelsList;
