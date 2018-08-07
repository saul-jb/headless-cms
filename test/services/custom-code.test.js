const assert = require("assert");
const app = require("../../src/app");

describe("'customCode' service", () => {
	it("registered the service", () => {
		const service = app.service("services/custom-code");

		assert.ok(service, "Registered the service");
	});
});
