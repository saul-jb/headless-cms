/* This hook is to be used in conjunction with the auth hook */
/* Removes any non public fields */

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
	return context => {
		for (let value in context.service.Model.schema.obj) {
			if (!context.service.Model.schema.obj[value].public) {

				for (let property of context.result.data) {
					if (property[value]) {
						delete property[value];
					}
				}
			}
		}

		return context;
	};
};
