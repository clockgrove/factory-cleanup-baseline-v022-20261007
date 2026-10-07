export function formatTask(task) {
  const marker = task.done ? '- [x] ' : '- [ ] ';
  const text = task.text.replace(/[\\\[\]]/g, character => `\\${character}`);
  return marker + text;
}
