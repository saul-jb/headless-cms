const auth = require("@feathersjs/authentication");

const checkPermissions = require("../../hooks/check-permissions");

const generalCommentPermissions = [
	// Must be a logged in user
	auth.hooks.authenticate("jwt"),

	// Has the correct permissions for this:
	checkPermissions({
		roles: ["comments"]
	})
];

module.exports = {
	before: {
		all: [],
		find: [],
		get: [],
		create: [...generalCommentPermissions],
		update: [...generalCommentPermissions],
		patch: [...generalCommentPermissions],
		remove: [...generalCommentPermissions]
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
