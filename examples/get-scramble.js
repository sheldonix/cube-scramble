#!/usr/bin/env node

// Use with installed package (npm install cube-scramble):
// import { getScramble, getScrambleTypes, setSeed } from "cube-scramble";

// For local repo testing:
import { getScramble, getScrambleTypes, setSeed } from "../src/index.js";

const type = process.argv[2] || "333";
const len = process.argv[3] ? Number(process.argv[3]) : 0;
const seed = process.argv[4];

if (seed !== undefined) {
  setSeed(String(seed));
}

console.log("types sample:", getScrambleTypes().slice(0, 10).join(", "));
console.log(`scramble(${type}, len=${len}):`);
console.log(getScramble(type, len));
