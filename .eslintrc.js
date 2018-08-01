module.exports = {
	env: {
		es6: true,
		node: true,
		mocha: true
	},
	parserOptions: {
		ecmaVersion: 2017
	},
	extends: "eslint:recommended",
	rules: {
		// disallow single quotes
		quotes: ["error", "double"],
		// force semi-colons
		semi: ["error", "always"],
		// allow tabs
		"no-tabs": [0],
		// use tab indentation
		indent: ["error", "tab"],
		// allow paren-less arrow functions
		"arrow-parens": 0,
		// allow async-await
		"generator-star-spacing": 0,
		// allow debugger during development
		"no-debugger": process.env.NODE_ENV === "production" ? 2 : 0
	}
}
