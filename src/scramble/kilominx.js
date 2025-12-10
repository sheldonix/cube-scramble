import { mathlib } from "../lib/mathlib.js";
import { klmsolver } from "../solver/kilominx.js";
import { scrMgr } from "../scramble-manager.js";

(function() {
	"use strict";
	function getScramble() {
		var cc = new klmsolver.KiloCubie();
		cc.perm = mathlib.rndPerm(20, true);
		var chksum = 60;
		for (var i = 0; i < 19; i++) {
			var t = mathlib.rn(3);
			cc.twst[i] = t;
			chksum -= t;
		}
		cc.twst[19] = chksum % 3;
		return klmsolver.solveKiloCubie(cc, true);
	}

	scrMgr.reg('klmso', getScramble);
})();
