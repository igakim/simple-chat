import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

// import faker from 'faker';
import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

import app from './jsx/index.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('Test');
app(gon);
