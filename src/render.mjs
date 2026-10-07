import { normalizeTasks } from './normalize.mjs';
import { formatTask } from './format.mjs';

export function renderTasks(records) {
  const tasks = normalizeTasks(records);
  return tasks.length === 0 ? '' : tasks.map(formatTask).join('\n') + '\n';
}
