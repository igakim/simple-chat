import { connect } from 'react-redux';
import Component from '../components/ChannelsList.jsx';

const mapStateToProps = state => ({
  channels: state.channels,
  currentChannelId: state.currentChannelId,
});

export default connect(mapStateToProps)(Component);
