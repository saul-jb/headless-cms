const auth = require("@feathersjs/authentication");

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
	return context => {
		if (context.params.token) {
			return auth.hooks.authenticate("jwt");
		} else {
			if (options.error) {
				throw new Error("Not authenticated");
			}

			context.params.public = true;
			return context;
		}
	};
};
