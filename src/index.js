import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import '@babel/polyfill';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import faker from 'faker';
import gon from 'gon';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import app from './app';
import { sendMessageSuccess } from './actions';
import rootReducer from './reducers';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

library.add(faSpinner);

// const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__;

if (!cookies.get('name')) {
  const randomName = faker.name.findName();
  cookies.set('name', randomName, { expires: 7 });
}

const store = createStore(
  rootReducer,
  gon,
  compose(
    applyMiddleware(thunk),
    // reduxDevtools && reduxDevtools(),
  ),
);

const userName = cookies.get('name');

const socket = io();
socket.on('newMessage', ({ data: { attributes } }) => {
  store.dispatch(sendMessageSuccess(attributes));
});

app(store, userName);
