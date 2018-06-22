"use strict";
/* eslint comma-dangle: ["error", "always"] */
/* eslint sort-keys: ["error", "asc"] */

module.exports = {
	env: {
		es6: true,
		node: true,
	},
	extends: "eslint:recommended",
	parserOptions: {
		ecmaVersion: 9,
		sourceType: "script",
	},
	root: true,
	rules: {
		"block-scoped-var": "error",
		"comma-dangle": [
			"error",
			"only-multiline",
		],
		"consistent-return": "error",
		"consistent-this": "error",
		"dot-location": [
			"error",
			"property",
		],
		"dot-notation": "error",
		"eol-last": "error",
		eqeqeq: "error",
		indent: [
			"error",
			"tab",
			{
				SwitchCase: 1,
				ignoreComments: true,
			},
		],
		"linebreak-style": [
			"error",
			"unix",
		],
		"no-await-in-loop": "warn",
		"no-console": "off",
		"no-constant-condition": "warn",
		"no-empty": "off",
		"no-fallthrough": "warn",
		"no-new-wrappers": "error",
		"no-octal": "warn",
		"no-regex-spaces": "warn",
		"no-return-await": "error",
		"no-unused-vars": "warn",
		"operator-linebreak": "error",
		"prefer-arrow-callback": "error",
		"prefer-const": "warn",
		"prefer-destructuring": "warn",
		"prefer-template": "error",
		quotes: [
			"error",
			"double",
			{
				allowTemplateLiterals: true,
				avoidEscape: true,
			},
		],
		"require-jsdoc": "off",
		semi: [
			"error",
			"always",
		],
		"sort-imports": "error",
		strict: [
			"error",
			"global",
		],
		"valid-jsdoc": [
			"warn",
			{
				prefer: {
					arg:	"param",
					argument:	"param",
					returns:	"return",
				},
				preferType: {
					Boolean:	"boolean",
					Number:	"number",
					Object:	"object",
					String:	"string",
					function:	"Function",
				},
				requireParamDescription: false,
				requireReturn: false,
				requireReturnDescription: false,
				requireReturnType: true,
			},
		],
	},
};
