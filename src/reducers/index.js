import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { omitBy } from 'lodash';

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

const channels = handleActions({
  [actions.addChannelSuccess](state, { payload }) {
    return {
      ...state,
      [payload.id]: payload,
    };
  },
  [actions.renameChannelSuccess](state, { payload }) {
    return {
      ...state,
      [payload.id]: payload,
    };
  },
  [actions.removeChannelSuccess](state, { payload: { id } }) {
    return omitBy(state, (value, key) => Number(key) === id);
  },
}, {});

const messages = handleActions({
  [actions.sendMessageSuccess](state, { payload }) {
    return state.concat(payload);
  },
}, {});

const currentChannelId = handleActions({
  [actions.changeChannelId](state, { payload: { id } }) {
    return id;
  },
}, 0);

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  sendingMessageState,
  form: formReducer,
});
