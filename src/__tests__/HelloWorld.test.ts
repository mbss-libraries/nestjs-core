import { HelloWorld } from '../index';

test('My Hello World', () => {
	expect(HelloWorld('Carl')).toBe('Hello Carl');
});
