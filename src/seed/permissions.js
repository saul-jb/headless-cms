// super_admin is defined in index.js

module.exports = [
	{
		name: "admin",
		permissions: [
			"pages:*",
			"comments:*",
			"custom_code:*",
			"users:*"
		],
		level: 9
	},
	{
		name: "editor",
		permissions: [
			"pages:create",
			"pages:update",
			"pages:patch"
		],
		level: 1
	},
	{
		name: "subscriber",
		permissions: [],
		level: 1
	}
];
