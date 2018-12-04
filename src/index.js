import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

// import faker from 'faker';
import gon from 'gon';
// import cookies from 'js-cookie';
import io from 'socket.io-client';

import app from './jsx/index.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const socket = io();
socket.on('connect', () => console.log('testing'));
socket.on('event', data => console.log(data));
socket.on('disconnect', () => console.log('disconnect'));

app(gon);
