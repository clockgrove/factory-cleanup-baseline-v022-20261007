# Markdown task renderer specification

## Outcome and boundaries

Implement the named exports `normalizeTasks`, `formatTask`, and `renderTasks` in the three existing source files. The independent normalization and formatting helpers may be developed concurrently; the renderer composes them. Preserve the complete committed acceptance tests, root package script, fixture assets and this specification. Only the three source modules may change. No external package, network request, service, generated media, deployment or publication feature is required.

## Normalize records

`normalizeTasks(records)` in `src/normalize.mjs` accepts an array of task records and returns a new array of new objects containing exactly `text` and `done`. Each record must be a non-null object that is not an array. Its `text` must be a string. Trim leading and trailing whitespace and replace every nonempty run of JavaScript whitespace with one ASCII space. Reject text that becomes empty. `done` may be absent or `undefined`, in which case it becomes `false`; otherwise it must be a boolean. Ignore unrelated record fields. Throw `TypeError` for any invalid input. Preserve record order and Unicode characters, and never mutate the input array or its records. An empty array produces an empty array.

## Format one task

`formatTask(task)` in `src/format.mjs` accepts a normalized task and returns one Markdown task-list line without a trailing newline. Use exactly `- [x] ` when `done` is true and `- [ ] ` when it is false. Escape each original backslash, left bracket and right bracket in `text` by prefixing it with a backslash, processing each original character once. Preserve all other text characters. The helper may assume the input satisfies the normalization contract; behavior for malformed direct calls is outside acceptance.

## Render a list

`renderTasks(records)` in `src/render.mjs` calls `normalizeTasks` and `formatTask` from their existing modules. Return the formatted tasks in their original order joined by exactly one LF, followed by exactly one trailing LF for a nonempty list. Return an empty string for an empty list. Propagate normalization's `TypeError` for malformed records. Do not mutate input. No command-line interface or file I/O is requested.

## Acceptance evidence

The complete immutable assertions are committed in `test/normalize.test.mjs`, `test/format.test.mjs`, and `test/render.test.mjs`. Each helper's corresponding command in README validates its owned implementation independently. `npm test` runs all three files on the integrated result. Tests are functional acceptance of the delivered code; no synthetic provider, controller, GitHub or service behavior is used. Passing commands prove their assertions; independent exact-tree inspection separately checks the public API, composition, path scope and input preservation.
