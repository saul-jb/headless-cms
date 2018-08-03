const assert = require("assert");
const app = require("../../src/app");

describe("'users' service", () => {
	const service = app.service("services/users");
	app.params.user = null;

	it("registered the service", () => {
		assert.ok(service, "Registered the service");
	});

	it("prevents unauthenticated users from 'find'", () => {
		return service.find().then(() => {
			assert.ok(false);
		});
	});
});
