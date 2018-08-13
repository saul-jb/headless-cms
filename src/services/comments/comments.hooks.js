const auth = require("@feathersjs/authentication");
const {restrictToOwner} = require("feathers-authentication-hooks");
const {iff} = require("feathers-hooks-common");

const checkPermissions = require("../../hooks/check-permissions");

module.exports = {
	before: {
		all: [],
		find: [],
		get: [],
		create: [
			auth.hooks.authenticate("jwt"),
			checkPermissions({ roles: ["comments:create", "comments:*"] })
		],
		update: [
			auth.hooks.authenticate("jwt"),
			checkPermissions({ roles: ["comments:update", "comments:*"], error: false }),
			iff(context => !context.params.permitted,
				restrictToOwner({ idField: "_id", ownerField: "_id"})
			)
		],
		patch: [
			auth.hooks.authenticate("jwt"),
			checkPermissions({ roles: ["comments:patch", "comments:*"], error: false }),
			iff(context => !context.params.permitted,
				restrictToOwner({ idField: "_id", ownerField: "_id"})
			)
		],
		remove: [
			auth.hooks.authenticate("jwt"),
			checkPermissions({ roles: ["comments:remove", "comments:*"], error: false }),
			iff(context => !context.params.permitted,
				restrictToOwner({ idField: "_id", ownerField: "_id"})
			)
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
