# cube-scramble

[![npm version](https://img.shields.io/npm/v/cube-scramble)](https://www.npmjs.com/package/cube-scramble)
[![npm downloads](https://img.shields.io/npm/dm/cube-scramble)](https://www.npmjs.com/package/cube-scramble)
[![node >=18](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)
[![license](https://img.shields.io/npm/l/cube-scramble)](LICENSE)

Pure JavaScript scramble generator for cubes and related twisty puzzles. Ships both ESM and CJS builds for easy use in Node, Vite/Nuxt, and build pipelines.

## Install

```bash
npm install cube-scramble
```

## Usage

### ESM

```js
import { getScramble, getScrambleTypes, setSeed } from "cube-scramble";

setSeed("42");                    // optional deterministic seed
console.log(getScrambleTypes());  // list available scramble types
console.log(getScramble("333"));  // generate a 3x3 scramble string
console.log(getScramble("444wca", 40)); // type with custom length
```

### CommonJS

```js
const { getScramble, setSeed } = require("cube-scramble");
setSeed("42");
console.log(getScramble("222so"));
```

## API

- **getScrambleTypes(): string[]** — all supported scramble type ids.
- **setSeed(seed: string | number): void** — set deterministic seed (uses ISAAC RNG). Call before `getScramble` to make results reproducible.
- **getScramble(type: string, length?: number, state?: any, neutrality?: number): string** — generate a scramble for the given type. `length`, `state`, and `neutrality` are optional and used by specific generators (e.g., Square-1, Mega).

## Examples

Generate WCA event scrambles:

```js
import { getScramble, getScrambleTypes, setSeed } from "cube-scramble";

// list all scramble type ids
console.log(getScrambleTypes());
// Set seed of scramble generator. Uses a CSPRNG (crypto.getRandomValues; falls back to timestamp).
// The seed should be a string; other types will be coerced via Object.prototype.toString().
setSeed("42"); // deterministic RNG seed

// Generate scrambles for common WCA events.
const wcaEvents = [
	["3x3x3", "333", 0],
	["2x2x2", "222so", 0],
	["4x4x4", "444wca", 0],
	["5x5x5", "555wca", 60],
	["6x6x6", "666wca", 80],
	["7x7x7", "777wca", 100],
	["3x3 bld", "333ni", 0],
	["3x3 fm", "333fm", 0],
	["3x3 oh", "333", 0],
	["clock", "clkwca", 0],
	["megaminx", "mgmp", 70],
	["pyraminx", "pyrso", 10],
	["skewb", "skbso", 0],
	["sq1", "sqrs", 0],
	["4x4 bld", "444bld", 40],
	["5x5 bld", "555bld", 60],
	["3x3 mbld", "r3ni", 5]
];

for (const [label, type, length] of wcaEvents) {
	const scramble = getScramble(type, length);
	console.log(`Generated scramble for ${label}:`, scramble);
}
```

## CLI smoke test (local)

After clone/install, you can sanity-check without building:

```bash
node examples/get-scramble.js 333 0 42   # type length seed
```

## Build

```bash
npm install
npm run build   # outputs dist/index.js (ESM) and dist/index.cjs (CJS)
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

[![GitHub](https://img.shields.io/badge/Github-sheldonix%2Fcube--scramble-green?logo=github)](https://github.com/sheldonix/cube-scramble)

## License
[GPL-3.0](./LICENSE)
