// permissions-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
	const mongooseClient = app.get("mongooseClient");
	const { Schema } = mongooseClient;
	const permissions = new Schema({
		name: { type: String, unique: true, required: true },
		permissions: [{ type: String, required: true }]
	}, {
		timestamps: true
	});

	return mongooseClient.model("permissions", permissions);
};
