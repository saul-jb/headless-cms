/* this hook compares the users level with the one they are trying to change */
/* only works for values with protected: true in the schema */

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
	return context => {
		if (context.data && context.params && context.params.user && context.id) {
			const permissionService = context.app.service("services/permissions");

			return Promise.all([
				permissionService.get(context.params.user.permissions),
				context.app.service("services/users").get(context.id).then(user => {
					return permissionService.get(user.permissions);
				}).catch(err => {
					throw new Error(err);
				})
			]).then(roles => {
				// roles[0] is the user making the request
				// roles[1] is the user the request is being made against


				for (let value in context.service.Model.schema.obj) {
					if (context.service.Model.schema.obj[value].protected) {
						if (context.data[value]) {
							// Prevent them from modifying other peoples roles that equal or greater than theirs
							if (roles[0].level > roles[1].level) {
								return permissionService.get(context.data[value]).then(newRole => {
									// Prevent users giving people a higher role than what they have
									if (newRole.level > roles[0].level) {
										delete context.data[value];
									}

									return context;
								});
							} else {
								delete context.data[value];
							}
						}
					}
				}

				return context;
			}).catch(err => {
				throw new Error(err);
			});
		} else {
			// throw new Error("'data', 'params', 'id' or 'params.user' is invalid.");
			return context;
		}
	};
};
