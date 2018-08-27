const local = require("@feathersjs/authentication-local");
const {restrictToOwner} = require("feathers-authentication-hooks");
const {iff} = require("feathers-hooks-common");

const auth = require("../../hooks/auth");
const restrictToPublic = require("../../hooks/restrict-to-public");
const restrictProtected = require("../../hooks/restrict-protected");

const checkPermissions = require("../../hooks/check-permissions");

module.exports = {
	before: {
		all: [
			// Prepare the "restrict-to-public" hook
			auth(),
			// Prevent the user from modifying proctected attributes
			restrictProtected()
		],
		find: [],
		get: [],
		create: [
			// Keep that password safe
			local.hooks.hashPassword({ passwordField: "password" }),
			//checkPermissions({ roles: ["users"] })
		],
		update: [
			// Keep that password safe
			local.hooks.hashPassword({ passwordField: "password" }),
			// Has permission for this
			checkPermissions({roles: ["users:update", "users:*"], error: false}),
			// Or applying to self
			iff(context => !context.params.permitted,
				restrictToOwner({ idField: "_id", ownerField: "_id"})
			)
		],
		patch: [
			// Keep that password safe
			local.hooks.hashPassword({ passwordField: "password" }),
			// Has permission for this
			checkPermissions({roles: ["users:patch", "users:*"], error: false}),
			// Or applying to self
			iff(context => !context.params.permitted,
				restrictToOwner({ idField: "_id", ownerField: "_id"})
			)
		],
		remove: [
			// Has permission for this
			checkPermissions({roles: ["users:remove", "users:*"], error: false}),
			// Or applying to self
			iff(context => !context.params.permitted,
				restrictToOwner({ idField: "_id", ownerField: "_id"})
			)
		]
	},

	after: {
		all: [
			local.hooks.protect("password"),
			// Remove any attributes not marked public
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
