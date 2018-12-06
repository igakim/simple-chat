import routes from '../src/routes';

test('example', () => {
  const expected = '/api/v1/channels/0/messages';
  expect(routes.postMessageUrl(0)).toBe(expected);
});

test('example2', () => {
  const expected = '/api/v1/channels/1/messages';
  expect(routes.postMessageUrl(1)).toBe(expected);
});
