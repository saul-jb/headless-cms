// comments-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
	const mongooseClient = app.get("mongooseClient");
	const { Schema } = mongooseClient;
	const comments = new Schema({
		title: { type: String, required: true },
		content: { type: String },
		author: { type: Schema.Types.ObjectId, ref: "users", required: true },
		editors: [{ type: Schema.Types.ObjectId, ref: "users" }],
		entity: { type: Schema.Types.ObjectId, required: true }
	}, {
		timestamps: true
	});

	return mongooseClient.model("comments", comments);
};
