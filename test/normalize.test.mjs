import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeTasks } from '../src/normalize.mjs';

test('normalizes whitespace, defaults completion, preserves order and Unicode', () => {
  assert.deepEqual(normalizeTasks([
    { text: '  Write\t the\n proposal  ', extra: 42 },
    { text: '发布 café 🚀', done: true },
    { text: 'Review', done: false },
    { text: 'Ship', done: undefined },
  ]), [
    { text: 'Write the proposal', done: false },
    { text: '发布 café 🚀', done: true },
    { text: 'Review', done: false },
    { text: 'Ship', done: false },
  ]);
  assert.deepEqual(normalizeTasks([]), []);
});

test('returns new objects without changing frozen inputs', () => {
  const record = Object.freeze({ text: '  Keep  me  ', done: true, extra: 'keep' });
  const input = Object.freeze([record]);
  const result = normalizeTasks(input);
  assert.notEqual(result, input);
  assert.notEqual(result[0], record);
  assert.deepEqual(result, [{ text: 'Keep me', done: true }]);
  assert.deepEqual(record, { text: '  Keep  me  ', done: true, extra: 'keep' });
});

test('rejects malformed arrays, records, text and completion', () => {
  for (const value of [undefined, null, {}, 'task', 7]) {
    assert.throws(() => normalizeTasks(value), TypeError);
  }
  for (const record of [null, [], 'task', 7, {}, { text: 7 }, { text: '' },
    { text: '\t\r\n ' }, { text: 'ok', done: 1 }, { text: 'ok', done: null },
    { text: 'ok', done: 'false' }]) {
    assert.throws(() => normalizeTasks([record]), TypeError);
  }
});
