import React from 'react';
import ChannelsList from './ChannelsList';
import Chat from './Chat';

const App = () => (
  <div className="row">
    <div className="col-lg-3">
      <ChannelsList />
    </div>
    <div className="col-lg-9">
      <Chat />
    </div>
  </div>
);

export default App;
