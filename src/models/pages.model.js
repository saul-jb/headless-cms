// pages-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
	const mongooseClient = app.get("mongooseClient");
	const { Schema } = mongooseClient;
	const pages = new Schema({
		type: { type: String },
		title: { type: String, required: true, unique: true },
		content: { type: String },
		author: { type: Schema.Types.ObjectId, ref: "users", required: true },
		editors: [{ type: Schema.Types.ObjectId, ref: "users" }]
	}, {
		timestamps: true
	});

	return mongooseClient.model("pages", pages);
};
