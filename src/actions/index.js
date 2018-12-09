import { createAction } from 'redux-actions';
// import { uniqueId } from 'lodash';
import axios from 'axios';
import routes from '../routes';

export const sendMessageRequest = createAction('MESSAGE_SEND_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');

export const sendMessage = (message, userName, currentChannelId, callback) => async (dispatch) => {
  dispatch(sendMessageRequest());
  try {
    const data = {
      data: {
        attributes: {
          message,
          userName,
          date: new Date(),
        },
      },
    };

    await axios.post(routes.postMessageUrl(currentChannelId), data);
    callback();
    // dispatch(sendMessageSuccess());
  } catch (e) {
    dispatch(sendMessageFailure());
    callback();
  }
};
//   { id: generalChannelId, name: 'general', removable: false },
export const changeChannelId = createAction('CHANNEL_ID_CHANGE');

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const addChannel = (name, callback) => async (dispatch) => {
  dispatch(addChannelRequest());
  try {
    const data = {
      data: {
        attributes: {
          name,
        },
      },
    };
    await axios.post(routes.channels(), data);
    callback();
  } catch (e) {
    dispatch(addChannelFailure());
    callback();
  }
};

export const renameChannelRequest = createAction('CHANNEL_RENAME_REQUEST');
export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const renameChannelFailure = createAction('CHANNEL_RENAME_FAILURE');

export const renameChannel = (name, id, callback) => async (dispatch) => {
  dispatch(renameChannelRequest());
  try {
    const data = {
      data: {
        attributes: {
          name,
        },
      },
    };

    await axios.patch(routes.theChannelUrl(id), data);
    callback();
  } catch (e) {
    dispatch(renameChannelFailure());
  }
};

export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');

export const removeChannel = id => async (dispatch) => {
  dispatch(removeChannelRequest());
  try {
    axios.delete(routes.theChannelUrl(id));
  } catch (e) {
    dispatch(removeChannelFailure());
  }
};
