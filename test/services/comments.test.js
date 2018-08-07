const assert = require("assert");
const app = require("../../src/app");

describe("'comments' service", () => {
	it("registered the service", () => {
		const service = app.service("services/comments");

		assert.ok(service, "Registered the service");
	});
});
