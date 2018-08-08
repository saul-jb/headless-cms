const logger = require("../logger");
const permissionsSeed = require("./permissions");

/*
Querys for permissions - if there is none seed database
	Create super_admin in the "permissions" database
	Create the admin with super_admin privledges in the "users" database
	Create all the permissions defined in permissions.js in the "permissions" database
*/

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
			}).then(superAdminPermission => {
				const promises = [];

				promises.push(userService.create({
					username: "admin",
					email: "admin",
					password: "admin",
					permissionId: superAdminPermission._id
				}));

				promises.push(permissionService.create(permissionsSeed));

				return promises;
			});
		}
	}).catch(err => {
		logger.error(err);
	});
};
