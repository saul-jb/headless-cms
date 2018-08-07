const assert = require("assert");
const feathers = require("@feathersjs/feathers");
const defaultPermissions = require("../../src/hooks/default-permissions");

describe("'defaultPermissions' hook", () => {
	let app;

	beforeEach(() => {
		app = feathers();

		app.use("/dummy", {
			async get(id) {
				return { id };
			}
		});

		app.service("dummy").hooks({
			before: defaultPermissions()
		});
	});

	it("runs the hook", async () => {
		const result = await app.service("dummy").get("test");
    
		assert.deepEqual(result, { id: "test" });
	});
});
