import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ButtonGroup } from 'react-bootstrap';
import { createSelector } from 'reselect';
import * as actionCreators from '../actions';
import AddChannelModal from './AddChannelModal';
import RenameChannelModal from './RenameChannelModal';
import RemoveChannelModal from './RemoveChannelModal';

const getChannels = state => state.channels;

const channelsList = createSelector(
  getChannels,
  ch => Object.values(ch),
);

const mapStateToProps = state => ({
  channels: channelsList(state),
});

@connect(mapStateToProps, actionCreators)
class ChannelsList extends React.Component {
  changeChannel = id => () => {
    const { changeChannelId } = this.props;
    changeChannelId({ id });
  }

  render() {
    const { channels } = this.props;
    return (
      <ListGroup>
        <div className="d-flex justify-content-between mb-2">
          <h4>Channels</h4>
          <AddChannelModal />
        </div>
        {channels.map(({ id, name, removable }) => (
          <ListGroup.Item key={id} as="div" className="d-flex justify-content-between" action eventKey={id} onClick={this.changeChannel(id)}>
            {name}
            <ButtonGroup size="sm" className="align-self-center">
              <RenameChannelModal id={id} name={name} />
              { removable ? <RemoveChannelModal id={id} /> : ''}
            </ButtonGroup>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }
}

export default ChannelsList;
