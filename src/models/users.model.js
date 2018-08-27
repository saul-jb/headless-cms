// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
	const mongooseClient = app.get("mongooseClient");
	const { Schema } = mongooseClient;
	const users = new Schema({
		// Required
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		username: { type: String, required: true, public: true },

		permissions: { type: Schema.Types.ObjectId, ref: "permissions", protected: true },

		// Meta data
		name: { type: String }
	}, {
		timestamps: true
	});

	return mongooseClient.model("users", users);
};
