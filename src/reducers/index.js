import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import * as actions from '../actions';

const sendingMessageState = handleActions({
  [actions.sendMessageRequest]() {
    return 'requested';
  },
  [actions.sendMessageFailure]() {
    return 'failed';
  },
  [actions.sendMessageSuccess]() {
    return 'successed';
  },
}, 'none');

const channels = handleActions({}, {});
const userName = handleActions({
  [actions.setUserName](state, { payload: { name } }) {
    return name;
  },
}, '');

const messages = handleActions({
  [actions.sendMessageSuccess](state, { payload }) {
    return state.concat(payload);
  },
}, {});

const currentChannelId = handleActions({}, {});

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  sendingMessageState,
  userName,
  form: formReducer,
});
