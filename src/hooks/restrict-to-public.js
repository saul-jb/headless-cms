/* This hook is to be used in conjunction with the auth hook */
/* Removes any non public fields */

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
	return context => {
		// NOTE: we allow the server to bypass the auth because it never has context.params.provider
		if (context.params && context.params.provider && !context.params.authenticated) {
			for (let value in context.service.Model.schema.obj) {
				if (!context.service.Model.schema.obj[value].public) {
					if ( Array.isArray(context.result.data) ){
						for (let property of context.result.data) {
							if (property[value]) {
								delete property[value];
							}
						}
					} else {
						delete context.result[value];
					}
				}
			}
		}

		return context;
	};
};
