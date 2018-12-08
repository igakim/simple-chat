import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { UserNameContext } from './userNameContext';

export default (store, userName) => {
  render(
    <Provider store={store}>
      <UserNameContext.Provider value={userName}>
        <App />
      </UserNameContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
