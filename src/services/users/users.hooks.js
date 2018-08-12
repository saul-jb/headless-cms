const local = require("@feathersjs/authentication-local");
const {restrictToOwner} = require("feathers-authentication-hooks");
const {iff} = require("feathers-hooks-common");

const auth = require("../../hooks/auth");
const restrictToPublic = require("../../hooks/restrict-to-public");

const restrictPermissions = require("../../hooks/restrict-permissions");
const checkPermissions = require("../../hooks/check-permissions");

const generalUserPermmisions = [
	// User must be signed in to modify data
	auth({error: true}),
	// Must not send password as plain text
	local.hooks.hashPassword({ passwordField: "password" }),

	// Must have this permission...
	/*checkPermissions({
		roles: ["users"],
		error: false
	}),

	// ...or is the owner
	iff(context => !context.params.permitted,
		restrictToOwner({ idField: "_id", ownerField: "_id"})
	)
*/];

module.exports = {
	before: {
		all: [
			// Prepare the "restrict-to-public" hook
			auth(),
			// Prevent the user from modifying permissions
			restrictPermissions()
		],
		find: [],
		get: [],
		create: [
			local.hooks.hashPassword({ passwordField: "password" }),
			checkPermissions({ roles: ["users"] })
		],
		update: [...generalUserPermmisions],
		patch: [...generalUserPermmisions],
		remove: [...generalUserPermmisions]
	},

	after: {
		all: [
			local.hooks.protect("password"),
			restrictToPublic()
		],
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
