const logger = require("./logger");

module.exports = function (app) {
	app.service("services/permissions").find().then(permissions => {
		if (permissions.total === 0) {
			// Seed
			logger.info("Seeding database");

			const permissionService = app.service("services/permissions");
			const userService = app.service("services/users");

			return permissionService.create({
				name: "super_admin",
				permissions: "*"
			}).then(result => {
				const promises = [];

				promises.push(userService.create({
					username: "admin",
					email: "admin",
					password: "admin",
					permissions: result._id
				}));

				promises.push(permissionService.create([
					{
						name: "admin",
						permissions: "*"
					}
				]));

				return promises;
			});
		}
	}).catch(err => {
		logger.error(err);
	});
};
