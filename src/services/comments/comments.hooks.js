const auth = require("@feathersjs/authentication");

const checkPermissions = require("../../hooks/check-permissions");

module.exports = {
	before: {
		all: [],
		find: [],
		get: [],
		create: [
			auth.hooks.authenticate("jwt"),
			checkPermissions({ roles: ["comments:create", "comments:*"] })
		],
		update: [
			auth.hooks.authenticate("jwt"),
			checkPermissions({ roles: ["comments:update", "comments:*"] })
		],
		patch: [
			auth.hooks.authenticate("jwt"),
			checkPermissions({ roles: ["comments:patch", "comments:*"] })
		],
		remove: [
			auth.hooks.authenticate("jwt"),
			checkPermissions({ roles: ["comments:remove", "comments:*"] })
		]
	},

	after: {
		all: [],
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
