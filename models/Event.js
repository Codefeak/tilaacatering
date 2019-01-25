const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
	eventDate: {
		type: String,
		required: true,
	},
	eventDateEnd: {
		type: String,
		required: true,
	},
	eventGuests: {
		type: Number,
		required: true,
	},
	eventType: {
		type: String,
		required: true,
	},
	eventRegion: {
		type: String,
		required: true,
	},
	eventSubmissionDate: {
		type: String,
		required: true,
	},
	eventFreeMessage: {
		type: String,
		required: true,
	},
	contactName: {
		type: String,
		required: true,
		select: false,
	},
	contactEmail: {
		type: String,
		required: true,
		select: false,
	},
	contactNumber: {
		type: String,
		required: true,
		select: false,
	},
	contactAddress: {
		type: String,
		required: true,
		select: false,
	},
	eventPurchases: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "users",
			},
		},
	],
});

const Event = mongoose.model("event", EventSchema);
module.exports = Event;
