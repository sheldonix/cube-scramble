"use strict";

// Minimal helpers to replace browser/jQuery-style utilities.
const DEBUG = false;

const $ = {
	isArray: Array.isArray,
	noop: function() {},
	now: function() {
		return Date.now();
	},
	col2std: function(col, faceMap) {
		const matches = (col || "").match(/#[0-9a-fA-F]{3,6}/g) || [];
		const expand = function(hex) {
			if (hex.length === 4) {
				return (
					"#" +
					hex[1] + hex[1] +
					hex[2] + hex[2] +
					hex[3] + hex[3]
				);
			}
			return hex;
		};
		const toInt = function(hex) {
			return parseInt(expand(hex).slice(1), 16);
		};
		const ret = [];
		for (var i = 0; i < faceMap.length; i++) {
			const idx = faceMap[i];
			ret.push(toInt(matches[idx] || "#ffffff"));
		}
		return ret;
	}
};

const UDPOLY_RE = "skb|m?pyr|prc|heli(?:2x2|cv)?|crz3a|giga|mgm|klm|redi|dino|fto|dmd|ctico";

const kernel = {
	getProp: function() {
		// Return a default color palette string for compatibility.
		return "#ff0 #f80 #0f0 #fff #f00 #00f #0ff #0f8 #f0f #999 #ccc #333 #888 #bada55 #facade #abcdef #654321 #123456 #0c0c0c #ededed";
	}
};

export { $, DEBUG, UDPOLY_RE, kernel };
