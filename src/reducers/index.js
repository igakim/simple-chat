import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { omitBy } from 'lodash';

import * as actions from '../actions';

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
}, null);

const notification = handleActions({
  [actions.closeAlert]() {
    return { show: false };
  },
  [actions.showAlert](state, { payload: { alertProperty } }) {
    return {
      show: true,
      title: alertProperty.title,
      variant: alertProperty.variant,
      description: alertProperty.description,
    };
  },
}, {
  show: false,
});

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  notification,
  form: formReducer,
});
