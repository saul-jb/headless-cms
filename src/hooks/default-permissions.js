/*
	This hook auto fills the permission field if empty
*/

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
	return context => {
		return context.app.service("services/permissions").find({ query: { name: "subscriber" } }).then(permissions => {
			if (Array.isArray(context.data)) {
				context.data.forEach(user => {
					if (!user.permissions) {
						user.permissionId = permissions.data[0]._id;
					}
				});
			} else if (!context.data.permissions) {
				context.data.permissionId = permissions.data[0]._id;
			}

			return context;
		});
	};
};
