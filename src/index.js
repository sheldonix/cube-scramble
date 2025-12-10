"use strict";

import { mathlib } from "./lib/mathlib.js";
import { scrMgr } from "./scramble-manager.js";

// Load scrambler side effects (registration happens on import).
import "./scramble/1x3x3.js";
import "./scramble/2x2x2.js";
import "./scramble/2x2x3.js";
import "./scramble/333lse.js";
import "./scramble/clock.js";
import "./scramble/gearcube.js";
import "./scramble/kilominx.js";
import "./scramble/megascramble.js";
import "./scramble/mgmlsll.js";
import "./scramble/pyraminx.js";
import "./scramble/redi.js";
import "./scramble/scramble_333_edit.js";
import "./scramble/scramble_444.js";
import "./scramble/scramble_fto.js";
import "./scramble/scramble_sq1_new.js";
import "./scramble/skewb.js";
import "./scramble/slide.js";
import "./scramble/utilscramble.js";

function getScrambleTypes() {
	return Object.keys(scrMgr.scramblers);
}

function setSeed(seed) {
	if (seed === undefined || seed === null) {
		return;
	}
	mathlib.setSeed(0, String(seed));
}

function getScramble(type = "333", length = 0, state = undefined, neutrality = 0) {
	const scrambler = scrMgr.scramblers[type];
	if (!scrambler) {
		throw new Error(`Unknown scramble type: ${type}`);
	}
	return scrambler(type, length, state, neutrality);
}

export { getScramble, getScrambleTypes, setSeed };
