"use strict";

import { mathlib } from "./lib/mathlib.js";

// Core scramble registry and helpers.
var scrMgr = (function(rn, rndEl) {

	function mega(turns, suffixes, length) {
		turns = turns || [[""]];
		suffixes = suffixes || [""];
		length = length || 0;
		var donemoves = 0;
		var lastaxis = -1;
		var s = [];
		var first, second;
		for (var i = 0; i < length; i++) {
			do {
				first = rn(turns.length);
				second = rn(turns[first].length);
				if (first != lastaxis) {
					donemoves = 0;
					lastaxis = first;
				}
			} while (((donemoves >> second) & 1) != 0);
			donemoves |= 1 << second;
			if (turns[first][second].constructor == Array) {
				s.push(rndEl(turns[first][second]) + rndEl(suffixes));
			} else {
				s.push(turns[first][second] + rndEl(suffixes));
			}
		}
		return s.join(' ');
	}

	var scramblers = {
		"blank": function() {
			return "N/A";
		}
	};

	var extra = {};

	function regScrambler(type, callback, filter_and_probs) {
		if (Array.isArray(type)) {
			for (var i = 0; i < type.length; i++) {
				scramblers[type[i]] = callback;
			}
		} else {
			scramblers[type] = callback;
			if (Array.isArray(filter_and_probs)) {
				extra[type] = function(ret, idx) { return ret[idx]; }.bind(null, filter_and_probs);
			} else if (filter_and_probs) {
				extra[type] = filter_and_probs;
			}
		}
		if (type == '333') {
			scramblers['333oh'] = scramblers['333ft'] = callback;
		}
		return regScrambler;
	}

	function getExtra(type, idx) {
		if (!(type in extra)) {
			return;
		}
		return extra[type](idx);
	}

	function formatScramble(str) {
		var repfunc = function(match, p1) {
			if (match[0] == '$') {
				var args = [p1];
				if (p1[0] == '[') {
					args = JSON.parse(p1);
				}
				return scramblers[args[0]].apply(this, args);
			} else if (match[0] == '#') {
				return mega.apply(this, JSON.parse('[' + p1 + ']'));
			} else {
				return '';
			}
		};
		var re1 = /[$#]\{([^\}]+)\}/g;
		return str.replace(re1, repfunc);
	}

	function rndState(filter, probs) {
		if (probs == undefined) {
			return undefined;
		}
		var ret = probs.slice();
		if (filter == undefined) {
			filter = ret;
		}
		if (probs[0] == 0) {
			return filter.slice();
		}
		var valids = [];
		for (var i = 0; i < filter.length; i++) {
			valids.push(i);
			if (!filter[i]) {
				ret[i] = 0;
				valids.pop();
			} else if (equalProb == 1) {
				ret[i] = 1;
			}
		}
		if (equalProb == 2) {
			if (millerCnt++ < 0) {
				millerCnt = mathlib.rn(65536);
			}
			return valids[MillerShuffle(millerCnt % valids.length, ~~(millerCnt / valids.length), valids.length)];
		}
		return mathlib.rndProb(ret);
	}

	function fixCase(cases, probs) {
		if (cases != undefined) {
			return cases;
		}
		if (equalProb == 2) {
			if (millerCnt++ < 0) {
				millerCnt = mathlib.rn(65536);
			}
			return MillerShuffle(millerCnt % probs.length, ~~(millerCnt / probs.length), probs.length);
		} else if (equalProb == 1) {
			return mathlib.rn(probs.length);
		} else {
			return mathlib.rndProb(probs);
		}
	}

	var equalProb = 0;
	var millerCnt = -1;

	function toTxt(scramble) {
		return scramble.replace(/<span[^>]*>(.*?)<\/span>/ig, '$1 ').replace(/~/g, '').replace(/\\n/g, '\n').replace(/`(.*?)`/g, '$1');
	}

	function MillerShuffle(idx, permIdx, length) {
		if (length <= 0 || idx < 0 || permIdx < 0) {
			return 0;
		}
		var p1 = 24317, p2 = 32141, p3 = 63629;
		var randR = permIdx + ~~(idx / length) * 131;
		var r1 = randR % p1 + 42;
		var r2 = ((randR * 0x89) ^ r1) % p2;
		var r3 = (r1 + r2 + p3) % length;
		var r4 = r1 ^ r2 ^ r3;
		var rx = ~~(randR / length) % length + 1;
		var rx2 = ~~(randR / length / length) % length + 1;
		var sidx = (idx + randR) % length;
		if (sidx % 3 == 0) sidx = (((sidx / 3) * p1 + r1) % ~~((length + 2) / 3)) * 3;
		if (sidx % 2 == 0) sidx = (((sidx / 2) * p2 + r2) % ~~((length + 1) / 2)) * 2;
		if (sidx < ~~(length / 2)) sidx = (sidx * p3 + r4) % ~~(length / 2);
		if ((sidx ^ rx) < length) sidx ^= rx;
		sidx = (sidx * p3 + r3) % length;
		if ((sidx ^ rx2) < length) sidx ^= rx2;
		return sidx;
	}

	return {
		reg: regScrambler,
		scramblers: scramblers,
		getExtra: getExtra,
		mega: mega,
		formatScramble: formatScramble,
		rndState: rndState,
		fixCase: fixCase,
		setEqPr: function(ep) { equalProb = ~~ep; },
		getEqPr: function() { return equalProb; },
		toTxt: toTxt
	}
})(mathlib.rn, mathlib.rndEl);

export { scrMgr };
