const auth = require("@feathersjs/authentication");

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
	return context => {
		//if (context.params.token) {
		if ((context.params.headers && context.params.headers.authorization) || context.params.token) {
			return auth.hooks.authenticate("jwt")(context);
		} else if (context.params && context.params.user) {
			if (options.error) {
				throw new Error("Not authenticated");
			}

			context.params.public = true;
		}

		return context;
	};
};
