export function normalizeTasks(records) {
  if (!Array.isArray(records)) {
    throw new TypeError('Expected an array of task records');
  }

  const tasks = [];
  for (const record of records) {
    if (record === null || typeof record !== 'object' || Array.isArray(record)) {
      throw new TypeError('Expected a task record object');
    }

    const { text, done } = record;
    if (typeof text !== 'string') {
      throw new TypeError('Task text must be a string');
    }
    const normalizedText = text.trim().replace(/\s+/g, ' ');
    if (normalizedText === '') {
      throw new TypeError('Task text must not be empty');
    }
    if (done !== undefined && typeof done !== 'boolean') {
      throw new TypeError('Task completion must be a boolean');
    }

    tasks.push({ text: normalizedText, done: done === undefined ? false : done });
  }
  return tasks;
}
