// Initializes the `customCode` service on path `/services/custom-code`
const createService = require("feathers-mongoose");
const createModel = require("../../models/custom-code.model");
const hooks = require("./custom-code.hooks");

module.exports = function (app) {
	const Model = createModel(app);
	const paginate = app.get("paginate");

	const options = {
		Model,
		paginate
	};

	// Initialize our service with any options it requires
	app.use("/services/custom-code", createService(options));

	// Get our initialized service so that we can register hooks
	const service = app.service("services/custom-code");

	service.hooks(hooks);
};
