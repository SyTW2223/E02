import { assert, expect, test } from 'vitest'

test('Math.sqrt()', () => {
  expect(Math.sqrt(4)).toBe(2)
  assert(Math.sqrt(9) === 3)
});

test('JSON', () => {
  const input = {
    foo: 'hello',
    bar: 'world',
  }
  const output = JSON.stringify(input);

  expect(output).toBe('{"foo":"hello","bar":"world"}');
  assert(output === '{"foo":"hello","bar":"world"}');
});