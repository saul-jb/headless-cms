const assert = require("assert");
const feathers = require("@feathersjs/feathers");
const restrictPermissions = require("../../src/hooks/restrict-permissions");

describe("'restrictPermissions' hook", () => {
	let app;

	beforeEach(() => {
		app = feathers();

		app.use("/dummy", {
			async get(id) {
				return { id };
			}
		});

		app.service("dummy").hooks({
			before: restrictPermissions()
		});
	});

	it("runs the hook", async () => {
		const result = await app.service("dummy").get("test");
    
		assert.deepEqual(result, { id: "test" });
	});
});
