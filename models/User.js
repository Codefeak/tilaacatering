const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	company: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	stripeCusID: {
		type: String,
		required: false,
	}
});

const User = mongoose.model("users", UserSchema);
module.exports = User;
