/* This hook checks if the user has the right to modify permissions and removes the field if not */

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
	return context => {
		// context.data is only on services "create", "update" and "patch"
		//context.params is only availible when the request comes from the client
		if (context.data && context.params && context.params.user) {
			return context.app.service("services/permissions").get(context.params.user.permissions).then(role => {
				if(
					role &&
					(role.permissions.includes("*") || role.permissions.includes("super_admin"))
				) {
					// Dont prevent anything because the super admin can do what he wants
				} else if (role.permissions.includes("permissions")) {
					// has permission for this
				} else {
					// Couldn't find the role...
					delete context.data.permissions;
				}
			}).catch(() => {
				// Couldn't find the role...
				delete context.data.permissions;
			});
		}

		// This is the condition that the server will use - dont restrict the server
		return context;
	};
};
