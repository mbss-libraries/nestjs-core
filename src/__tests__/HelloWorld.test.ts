import { HelloWorld } from '../index';
test('My Hello World', () => {
  expect(HelloWorld('Carl')).toBe('Hello Carl');
});

import { Location } from '../index';
test('Location creation', () => {
  const location = new Location();
  location.name = 'TestLocation';
  expect(location.name).toBe('TestLocation');
});