const auth = require("@feathersjs/authentication");

const defaultPermissions = require("../../hooks/default-permissions");
const checkPermissions = require("../../hooks/check-permissions");

module.exports = {
	before: {
		all: [
			// Must be a logged in user
			auth.hooks.authenticate("jwt")
		],
		find: [],
		get: [],
		create: [
			checkPermissions({ roles: ["super_admin", "permissions"] }),
			defaultPermissions()
		],
		update: [ checkPermissions({ roles: ["super_admin", "permissions"] }) ],
		patch: [ checkPermissions({ roles: ["super_admin", "permissions"] }) ],
		remove: [ checkPermissions({ roles: ["super_admin", "permissions"] }) ]
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
