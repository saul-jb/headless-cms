/* This hook retrieves the roles and verifys the users permission for it */

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
	return context => {
		if (context.data && context.params && context.params.user) {
			return context.app.service("services/permissions").get(context.params.user.permissions).then(userRole => {
				for (let role of options.roles) {
					if (userRole.permissions.includes(role)) {
						context.params.permitted = true;
						return context;
					}
				}

				if (!options.error) {
					context.params.permitted = false;

					return context;
				}

				throw new Error("You do not have permission to do that.");
			}).catch(err => {
				throw new Error(err);
			});
		}

		return context;
	};
};
