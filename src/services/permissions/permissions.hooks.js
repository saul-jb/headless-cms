const auth = require("@feathersjs/authentication");

const checkPermissions = require("../../hooks/check-permissions");

module.exports = {
	before: {
		all: [
			// Must be a logged in user
			auth.hooks.authenticate("jwt")
		],
		find: [],
		get: [],
		create: [ checkPermissions({ roles: ["permissions:create", "permissions:*"] }) ],
		update: [ checkPermissions({ roles: ["permissions:update", "permissions:*"] }) ],
		patch: [ checkPermissions({ roles: ["permissions:patch", "permissions:*"] }) ],
		remove: [ checkPermissions({ roles: ["permissions:delete", "permissions:*"] }) ]
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
