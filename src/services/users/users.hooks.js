const auth = require("@feathersjs/authentication");
const local = require("@feathersjs/authentication-local");
const checkPermissions = require("feathers-permissions");
const {restrictToOwner} = require("feathers-authentication-hooks");
const {iff} = require("feathers-hooks-common");

const restrictPermissions = require("../../hooks/restrict-permissions");

const generalUserPermmisions = [
	// Must be a logged in user
	auth.hooks.authenticate("jwt"),

	// Must not send password as plain text
	local.hooks.hashPassword({ passwordField: "password" }),

	// Must have this permission...
	checkPermissions({
		roles: ["users"],
		error: false
	}),
	// ...or is the owner
	iff(context => !context.params.permitted,
		restrictToOwner({ idField: "_id", ownerField: "_id"})
	)
];

const populatePermissions = require("../../hooks/populate-permissions");

module.exports = {
	before: {
		all: [// Prevent the user from modifying permissions
			restrictPermissions(),
			populatePermissions()
		],
		find: [...generalUserPermmisions],
		get: [...generalUserPermmisions],
		create: [
			local.hooks.hashPassword({ passwordField: "password" }),
			checkPermissions({ roles: ["users"] })
		],
		update: [...generalUserPermmisions],
		patch: [...generalUserPermmisions],
		remove: [...generalUserPermmisions]
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
