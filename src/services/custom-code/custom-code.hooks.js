const auth = require("@feathersjs/authentication");

const checkPermissions = require("../../hooks/check-permissions");

const generalCustomCodePermissions = [
	// Must be a logged in user
	auth.hooks.authenticate("jwt"),

	// Has the correct permissions for this:
	checkPermissions({
		roles: ["custom_code"]
	})
];

module.exports = {
	before: {
		all: [],
		find: [],
		get: [],
		create: [...generalCustomCodePermissions],
		update: [...generalCustomCodePermissions],
		patch: [...generalCustomCodePermissions],
		remove: [...generalCustomCodePermissions]
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
