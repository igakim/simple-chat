import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

const getChannels = state => state.channels;
const getCurrentChannelId = state => state.currentChannelId;

const currentChannelTitle = createSelector(
  getChannels,
  getCurrentChannelId,
  (channels, id) => Object.values(channels).find(el => el.id === id).name,
);

const mapStateToProps = state => ({
  channelName: currentChannelTitle(state),
});

@connect(mapStateToProps)
class MessageTitle extends React.Component {
  render() {
    const { channelName } = this.props;
    return (
      <h1>{channelName}</h1>
    );
  }
}

export default MessageTitle;
