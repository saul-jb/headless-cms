const auth = require("@feathersjs/authentication");

const checkPermissions = require("../../hooks/check-permissions");

module.exports = {
	before: {
		all: [],
		find: [],
		get: [],
		create: [
			auth.hooks.authenticate("jwt"),
			checkPermissions({ roles: ["custom_code:create", "custom_code:*"] })
		],
		update: [
			auth.hooks.authenticate("jwt"),
			checkPermissions({ roles: ["custom_code:update", "custom_code:*"] })
		],
		patch: [
			auth.hooks.authenticate("jwt"),
			checkPermissions({ roles: ["custom_code:patch", "custom_code:*"] })
		],
		remove: [
			auth.hooks.authenticate("jwt"),
			checkPermissions({ roles: ["custom_code:remove", "custom_code:*"] })
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
