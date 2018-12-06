import { createAction } from 'redux-actions';
// import { uniqueId } from 'lodash';
import axios from 'axios';
import '@babel/polyfill';
import routes from '../routes';

export const sendMessageRequest = createAction('MESSAGE_SEND_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');

export const setUserName = createAction('USER_NAME_SET');

export const sendMessage = (message, userName, currentChannelId) => async (dispatch) => {
  dispatch(sendMessageRequest());
  try {
    const data = {
      data: {
        attributes: {
          message,
          userName,
        },
      },
    };

    await axios.post(routes.postMessageUrl(currentChannelId), data);
    // dispatch(sendMessageSuccess(response.data));
  } catch (e) {
    dispatch(sendMessageFailure());
  }
};
