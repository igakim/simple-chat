import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import '@babel/polyfill';
import { createStore, applyMiddleware, compose } from 'redux';
import { keyBy } from 'lodash';
import thunk from 'redux-thunk';
import faker from 'faker';
import gon from 'gon';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSpinner, faPlus, faPen, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import app from './app';
import {
  sendMessageSuccess,
  addChannelSuccess,
  renameChannelSuccess,
  removeChannelSuccess,
  changeChannelId,
} from './actions';
import rootReducer from './reducers';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

library.add(faSpinner, faPlus, faPen, faTrashAlt);

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

if (!cookies.get('name')) {
  const randomName = faker.name.findName();
  cookies.set('name', randomName, { expires: 7 });
}

const channels = keyBy(gon.channels, el => el.id);

const store = createStore(
  rootReducer,
  { ...gon, channels },
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

const userName = cookies.get('name');

const socket = io();
socket.on('newMessage', ({ data: { attributes } }) => {
  store.dispatch(sendMessageSuccess(attributes));
});
socket.on('newChannel', ({ data: { attributes } }) => {
  store.dispatch(addChannelSuccess(attributes));
});
socket.on('renameChannel', ({ data: { attributes } }) => {
  store.dispatch(renameChannelSuccess(attributes));
});
socket.on('removeChannel', ({ data: { id } }) => {
  store.dispatch(changeChannelId({ id: 1 }));
  store.dispatch(removeChannelSuccess({ id }));
});

app(store, userName);
