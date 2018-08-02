const auth = require("@feathersjs/authentication");
const local = require("@feathersjs/authentication-local");
const checkPermissions = require("feathers-permissions");

const firstUserCheck = require("../../hooks/first-user-check");

// TODO: Seed the first user (admin)

module.exports = {
	before: {
		all: [],
		find: [
			auth.hooks.authenticate("jwt"),
			checkPermissions({ roles: ["users"] })
		],
		get: [
			auth.hooks.authenticate("jwt"),
			checkPermissions({ roles: ["users"] })
		],
		create: [
			local.hooks.hashPassword({ passwordField: "password" }),
			firstUserCheck(), // Will skip any further hooks for the first user
			checkPermissions({ roles: ["users"] })
		],
		update: [
			auth.hooks.authenticate("jwt"),
			local.hooks.hashPassword({ passwordField: "password" }),
			checkPermissions({ roles: ["users"] })
		],
		patch: [
			auth.hooks.authenticate("jwt"),
			local.hooks.hashPassword({ passwordField: "password" }),
			checkPermissions({ roles: ["users"] })
		],
		remove: [
			auth.hooks.authenticate("jwt"),
			checkPermissions({ roles: ["users"] })
		]
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
