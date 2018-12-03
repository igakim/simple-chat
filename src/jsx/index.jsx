import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './store';
import App from './components/App.jsx';

export default (gon) => {
  render(
    <Provider store={createStore(gon)}>
      <App />
    </Provider>,
    document.getElementById('chat'),
  );
};
