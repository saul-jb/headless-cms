const auth = require("@feathersjs/authentication");

const checkPermissions = require("../../hooks/check-permissions");

const generalPagePermissions = [
	// Must be a logged in user
	auth.hooks.authenticate("jwt"),

	// Has the correct permissions for this:
	checkPermissions({
		roles: ["pages"]
	})
];

module.exports = {
	before: {
		all: [],
		find: [],
		get: [],
		create: [...generalPagePermissions],
		update: [...generalPagePermissions],
		patch: [...generalPagePermissions],
		remove: [...generalPagePermissions]
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
