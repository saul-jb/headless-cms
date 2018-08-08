const assert = require("assert");
const feathers = require("@feathersjs/feathers");
const populatePermissions = require("../../src/hooks/populate-permissions");

describe("'populatePermissions' hook", () => {
	let app;

	beforeEach(() => {
		app = feathers();

		app.use("/dummy", {
			async get(id) {
				return { id };
			}
		});

		app.service("dummy").hooks({
			before: populatePermissions()
		});
	});

	it("runs the hook", async () => {
		const result = await app.service("dummy").get("test");
    
		assert.deepEqual(result, { id: "test" });
	});
});
