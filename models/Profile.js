const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
	users: [
		{
			type: Schema.Types.ObjectId,
			ref: "users",
		},
	],
	events: [
		{
			type: Schema.Types.ObjectId,
			ref: "events",
		},
	],
});

const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;
