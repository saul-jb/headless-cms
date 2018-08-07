// super_admin is defined in index.js

module.exports = [
	{
		name: "admin",
		permissions: ["admin", "pages:*", "comments:*", "custom_code:*", "users:*"]
	},
	{
		name: "editor",
		permissions: [
			"editor",
			"pages:create", "pages:update", "pages:patch"
		]
	},
	{
		name: "subscriber",
		permissions: ["subscriber"]
	}
];
