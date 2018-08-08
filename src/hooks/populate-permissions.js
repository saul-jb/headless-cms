// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
	return context => {
		if (context.data && context.data.permissionId) {
			return context.app.service("services/permissions").get(context.data.permissionId).then(role => {
				context.data.permissions = role.permissions;

				return context;
			});
		}

		return context;
	};
};
