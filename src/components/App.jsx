import React from 'react';
import { Tab, Row, Col } from 'react-bootstrap';
import ChannelsList from './ChannelsList';
import Chat from './Chat';
import AlertBadge from './AlertBadge';


const App = () => (
  <>
    <AlertBadge />
    <Tab.Container id="chat" defaultActiveKey="1">
      <Row>
        <Col sm={3}>
          <ChannelsList />
        </Col>
        <Col sm={9}>
          <Chat />
        </Col>
      </Row>
    </Tab.Container>
  </>
);

export default App;
