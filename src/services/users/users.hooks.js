const auth = require("@feathersjs/authentication");
const local = require("@feathersjs/authentication-local");
const checkPermissions = require("feathers-permissions");

// TODO: Seed the first user (admin)

module.exports = {
	before: {
		all: [checkPermissions({ roles: ["users"] })],
		find: [auth.hooks.authenticate("jwt")],
		get: [auth.hooks.authenticate("jwt")],
		create: [local.hooks.hashPassword({ passwordField: "password" })],
		update: [
			auth.hooks.authenticate("jwt"),
			local.hooks.hashPassword({ passwordField: "password" })
		],
		patch: [
			auth.hooks.authenticate("jwt"),
			local.hooks.hashPassword({ passwordField: "password" })
		],
		remove: [auth.hooks.authenticate("jwt")]
	},

	after: {
		all: [local.hooks.protect("password")],
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
