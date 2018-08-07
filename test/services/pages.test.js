const assert = require("assert");
const app = require("../../src/app");

describe("'pages' service", () => {
	it("registered the service", () => {
		const service = app.service("services/pages");

		assert.ok(service, "Registered the service");
	});
});
