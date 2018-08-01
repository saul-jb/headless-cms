const auth = require("@feathersjs/authentication");
const local = require("@feathersjs/authentication-local");

module.exports = {
	before: {
		all: [],
		find: [auth.hooks.authenticate("jwt")],
		get: [],
		create: [local.hooks.hashPassword({ passwordField: "password" })],
		update: [],
		patch: [],
		remove: []
	},

	after: {
		all: [
			local.hooks.protect("password")
			// TODO: check permissions
		],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	},

	error: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	}
};
