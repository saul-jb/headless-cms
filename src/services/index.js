const users = require("./users/users.service.js");
const permissions = require("./permissions/permissions.service.js");
const pages = require("./pages/pages.service.js");
const comments = require("./comments/comments.service.js");
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
	app.configure(users);
	app.configure(permissions);
	app.configure(pages);
	app.configure(comments);
};
