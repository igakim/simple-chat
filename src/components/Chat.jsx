import React from 'react';
import MessageBox from './MessageBox';
import MessageForm from './MessageForm';
import MessageTitle from './MessageTitle';


const Chat = () => (
  <div className="card">
    <div className="card-header">
      <MessageTitle />
    </div>
    <div className="card-body">
      <MessageBox />
    </div>
    <div className="card-footer">
      <MessageForm />
    </div>
  </div>
);

export default Chat;
