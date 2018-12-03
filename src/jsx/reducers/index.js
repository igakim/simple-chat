import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

// import * as actions from '../actions';

const channels = handleActions({}, {});
const messages = handleActions({}, {});
const currentChannelId = handleActions({}, {});

export default combineReducers({ channels, messages, currentChannelId });
