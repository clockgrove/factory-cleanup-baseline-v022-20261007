import test from 'node:test';
import assert from 'node:assert/strict';
import { formatTask } from '../src/format.mjs';

test('uses exact task markers with no trailing newline', () => {
  assert.equal(formatTask({ text: 'Ship', done: false }), '- [ ] Ship');
  assert.equal(formatTask({ text: '发布 café 🚀', done: true }), '- [x] 发布 café 🚀');
});

test('escapes every original backslash and bracket exactly once', () => {
  const task = Object.freeze({ text: String.raw`[docs] C:\tmp\[a]`, done: false });
  assert.equal(formatTask(task), String.raw`- [ ] \[docs\] C:\\tmp\\\[a\]`);
  assert.deepEqual(task, { text: String.raw`[docs] C:\tmp\[a]`, done: false });
});

test('preserves other characters and input content', () => {
  const task = Object.freeze({ text: 'a * b _ c ` d', done: true });
  assert.equal(formatTask(task), '- [x] a * b _ c ` d');
  assert.equal(task.text, 'a * b _ c ` d');
});
