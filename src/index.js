import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import faker from 'faker';
import gon from 'gon';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import app from './app';
import { sendMessageSuccess, setUserName } from './actions';
import rootReducer from './reducers';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

library.add(faSpinner);

// const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__;
// console.log(cookies.get('name'));
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

store.dispatch(setUserName({ name: cookies.get('name') }));

const socket = io();
// socket.on('connect', () => console.log('testing'));
socket.on('newMessage', ({ data: { attributes } }) => {
  store.dispatch(sendMessageSuccess(attributes));
});
// socket.on('disconnect', () => console.log('disconnect'));
app(store);
