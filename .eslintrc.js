"use strict";
/* eslint comma-dangle: ["error", "always"] */
/* eslint sort-keys: ["error", "asc"] */

module.exports = {
	env: {
		es6: true,
		node: true,
	},
	extends: "@exe-boss",
	parserOptions: {
		ecmaVersion: 9,
		sourceType: "script",
	},
	root: true,
	rules: {
		"comma-dangle": [
			"error",
			"only-multiline",
		],
	},
};
