"use strict";
/* eslint comma-dangle: ["error", "always"] */
/* eslint sort-keys: ["error", "asc"] */

module.exports = {
	"env": {
		"es6": true,
		"node": true,
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"sourceType": "module",
	},
	"rules": {
		"block-scoped-var": "error",
		"comma-dangle": [
			"error",
			{
				"functions": "never",
			},
		],
		"indent": [
			"error",
			"tab",
			{
				"SwitchCase": 1,
			},
		],
		"linebreak-style": [
			"error",
			"unix",
		],
		"no-console": "off",
		"no-octal": "off",
		"no-unused-vars": "warn",
		"quotes": [
			"error",
			"double",
			{
				"allowTemplateLiterals": true,
				"avoidEscape": true,
			},
		],
		"semi": [
			"error",
			"always",
		],
	},
};