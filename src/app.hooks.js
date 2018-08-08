// Application hooks that run for every service
const log = require("./hooks/log");

// must poulate permissions on requests.

module.exports = {
	before: {
		all: [ log() ],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	},

	after: {
		all: [ log() ],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	},

	error: {
		all: [ log() ],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	}
};
