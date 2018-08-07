/*
	This hook auto fills the permission field if empty
*/

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
	return context => {
		const defaultPermission = ["subscriber"];

		if (Array.isArray(context.data)) {
			context.data.forEach(user => {
				if (!user.permissions) {
					user.permissions = defaultPermission;
				}
			});
		} else if (!context.data.permissions) {
			context.data.permissions = defaultPermission;
		}

		return context;
	};
};
