const host = '';
// api/v1/channels/0/messages
export default {
  postMessageUrl: id => [host, 'api/v1/channels', id, 'messages'].join('/'),
  channels: () => [host, 'api/v1/channels'].join('/'),
  theChannelUrl: id => [host, 'api/v1/channels', id].join('/'),
};
