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
