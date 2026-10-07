import test from 'node:test';
import assert from 'node:assert/strict';
import { renderTasks } from '../src/render.mjs';

test('renders normalization, escaping, order and exact LF boundaries together', () => {
  assert.equal(renderTasks([
    { text: '  Read\t[docs]  ' },
    { text: 'Ship\r\n café 🚀', done: true },
  ]), '- [ ] Read \\[docs\\]\n- [x] Ship café 🚀\n');
  assert.equal(renderTasks([]), '');
  assert.equal(renderTasks([{ text: 'One' }]), '- [ ] One\n');
});

test('preserves frozen input and propagates TypeError', () => {
  const record = Object.freeze({ text: '  Preserve  this ', done: false });
  const records = Object.freeze([record]);
  assert.equal(renderTasks(records), '- [ ] Preserve this\n');
  assert.equal(record.text, '  Preserve  this ');
  assert.throws(() => renderTasks([{ text: ' ' }]), TypeError);
  assert.throws(() => renderTasks(null), TypeError);
});
