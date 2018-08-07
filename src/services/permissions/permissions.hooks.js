const auth = require("@feathersjs/authentication");
const checkPermissions = require("feathers-permissions");
const defaultPermissions = require("../../hooks/default-permissions");

module.exports = {
	before: {
		all: [
			// Must be a logged in user
			auth.hooks.authenticate("jwt")
		],
		find: [],
		get: [],
		create: [
			checkPermissions({ roles: ["super_admin"] }),
			defaultPermissions()
		],
		update: [ checkPermissions({ roles: ["super_admin"] }) ],
		patch: [ checkPermissions({ roles: ["super_admin"] }) ],
		remove: [ checkPermissions({ roles: ["super_admin"] }) ]
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
