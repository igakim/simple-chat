import React from 'react';
import { Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import MessageBox from './MessageBox';
import MessageForm from './MessageForm';
import MessageTitle from './MessageTitle';

const getChannels = state => state.channels;

const channelsList = createSelector(
  getChannels,
  ch => Object.values(ch),
);

const mapStateToProps = state => ({
  channels: channelsList(state),
  currentChannelId: state.currentChannelId,
});

@connect(mapStateToProps)
class Chat extends React.Component {
  render() {
    const { channels } = this.props;
    return (
      <Tab.Content>
        {channels.map(({ id }) => (
          <Tab.Pane eventKey={id} key={id}>
            <div className="card">
              <div className="card-header">
                <MessageTitle />
              </div>
              <div className="card-body">
                <MessageBox />
              </div>
              <div className="card-footer">
                <MessageForm />
              </div>
            </div>
          </Tab.Pane>
        ))}
      </Tab.Content>
    );
  }
}

export default Chat;
