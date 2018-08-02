const feathers = require("@feathersjs/feathers");

/* This hook checks for users in the database and bypasses all other hooks if there is none */

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
	return context => {
		return context.app.service("users").find().then(users => {
			return users.total === 0 ? feathers.SKIP : context;
		});
	};
};
