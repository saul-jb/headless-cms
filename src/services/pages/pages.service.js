// Initializes the `pages` service on path `/services/pages`
const createService = require("feathers-mongoose");
const createModel = require("../../models/pages.model");
const hooks = require("./pages.hooks");

module.exports = function (app) {
	const Model = createModel(app);
	const paginate = app.get("paginate");

	const options = {
		Model,
		paginate
	};

	// Initialize our service with any options it requires
	app.use("/services/pages", createService(options));

	// Get our initialized service so that we can register hooks
	const service = app.service("services/pages");

	service.hooks(hooks);
};
