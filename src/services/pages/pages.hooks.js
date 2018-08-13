const auth = require("@feathersjs/authentication");

const checkPermissions = require("../../hooks/check-permissions");

module.exports = {
	before: {
		all: [],
		find: [],
		get: [],
		create: [
			auth.hooks.authenticate("jwt"),
			checkPermissions({ roles: ["pages:create", "pages:*"] })
		],
		update: [
			auth.hooks.authenticate("jwt"),
			checkPermissions({ roles: ["pages:update", "pages:*"] })
		],
		patch: [
			auth.hooks.authenticate("jwt"),
			checkPermissions({ roles: ["pages:patch", "pages:*"] })
		],
		remove: [
			auth.hooks.authenticate("jwt"),
			checkPermissions({ roles: ["pages:remove", "pages:*"] })
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
