# Markdown task renderer qualification packet

This disposable public packet measures a small greenfield implementation with fixed functional acceptance. It is derived from Factory's approved `test/fixtures/disposable-target` qualification fixture, with its public 2×2 source image retained unchanged. The image is not an input to the coding task.

Read `SPEC.md` and the complete committed acceptance files before implementing. Only `src/normalize.mjs`, `src/format.mjs`, and `src/render.mjs` may change. Do not add dependencies, tests, documentation, tools, configuration, network services or new features. The specification and tests stay unchanged.

The base intentionally contains three throwing implementation stubs. Passing acceptance requires real implementation. No dependency installation is needed; Node 22 or newer is sufficient.

## Validation commands

These commands already exist at the immutable base and run real committed assertions:

- `node --test test/normalize.test.mjs`
- `node --test test/format.test.mjs`
- `node --test test/render.test.mjs`
- `npm test`
