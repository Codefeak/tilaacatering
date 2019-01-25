const express = require("express");
const router = express.Router();
const passport = require("passport");
const Event = require("../models/Event");

const purchasesToArrayLength = event => {
	const newEvent = {
		...event,
		eventPurchases: event.eventPurchases.length,
	};
	return newEvent;
};

const arrayPurchaseFields = [
	"contactName",
	"contactEmail",
	"contactNumber",
	"contactAddress",
];

const purchased = (event, userId) => event.eventPurchases.some(purchase => purchase.user.toString() === userId);

// @route   GET api/events
// @desc    Get all events
// @access  private
router.get("/", (req, res) => {
	Event.find()
		.lean()
		.then(events => {
			res.json(events.map(event => purchasesToArrayLength(event)));
		});
});

// router.get("/all", (req, res) => {
// 	Event.find({},"+contactName +contactEmail +contactNumber +contactAddress")
// 		.lean()
// 		.then(events => {
// 			res.json(events.map(event => purchasesToArrayLength(event)));
// 		});
// });

// @route   POST api/events
// @desc    Create an event
// @access  private
router.post("/", (req, res) => {
	const newEvent = new Event({
		eventDate: req.body.eventDate,
		eventDateEnd: req.body.eventDateEnd,
		eventGuests: req.body.eventGuests,
		eventType: req.body.eventType,
		eventRegion: req.body.eventRegion,
		eventSubmissionDate: new Date().toJSON(),
		eventFreeMessage: req.body.eventFreeMessage,
		eventPurchases: [],
		contactName: req.body.contactName,
		contactEmail: req.body.contactEmail,
		contactNumber: req.body.contactNumber,
		contactAddress: req.body.contactAddress,
	});
	newEvent
		.save()
		.then(newEvent => res.json(newEvent))
		.catch(err => console.log(err));
});

// @route   GET api/events/:eventId
// @desc    Get an event by eventId. Returns full event contact details if purchased, else, returns general event details.
// @access  private
router.get(
	"/:eventId",
	passport.authenticate("jwt-user", { session: false, }),
	(req, res) => {
		const id = req.params.eventId;
		Event.findById(
			id,
			"+contactName +contactEmail +contactNumber +contactAddress"
		)
			.lean()
			.then(event => {
				if (event) {
					purchased(event, req.user.id)
						? res.json(purchasesToArrayLength(event))
						: res.json(
							purchasesToArrayLength(
								Object.keys(event).reduce((obj, key) => {
									if (!arrayPurchaseFields.includes(key)) {
										obj[key] = event[key];
									}
									return obj;
								}, {})
							)
						  );
				}
			})
			.catch(err => {
				return res.status(404).json(err);
			});
	}
);

// @route   DELETE api/events/:eventId
// @desc    Delete an event
// @access  private
router.delete("/:eventId", (req, res) => {
	const id = req.params.eventId;
	Event.findByIdAndDelete(id, (err, event) => {
		if (err) {
			console.log(err);
		} else {
			res.json({
				message: "Successfully deleted event",
				deletedEvent: event,
			});
		}
	});
});

// @route   PUT api/events/:eventId
// @desc    Edit an event
// @access  private
router.put("/:eventId", (req, res) => {
	const id = req.params.eventId;
	const errors = {};
	Event.findByIdAndUpdate(id, req.body, {new: true,}).then(event => {
		if (event) {
			res.status(200).json(event);
		} else {
			errors.updateEvent = "Event cant be updated";
			res.status(404).json(errors);
		}
	});
});

// @route   GET api/events/:id/full
// @desc    Get the full event with all details. This is for admin use only.
// @access  private
router.get(
	"/:eventId/full",
	passport.authenticate("jwt-user", { session: false, }),
	(req, res) => {
		const errors = {};
		const id = req.params.eventId;

		Event.findById(
			id,
			"+contactName +contactEmail +contactNumber +contactAddress"
		)
			.then(event => {
				if (event) {
					return res.json(event);
				}
			})
			.catch(err => {
				return res.status(404).json(err);
			});
	}
);

router.put(
	"/:eventId/purchase",
	passport.authenticate("jwt-user", { session: false, }),
	(req, res) => {
		const errors = {};
		const id = req.params.eventId;

		Event.findById(
			id,
			"+contactName +contactEmail +contactNumber +contactAddress"
		)
			.then(event => {
				if (event) {
					if (purchased(event, req.user.id)) {
						return res
							.status(400)
							.json({ alreadybought: "You have already bought this event", });
					} else {
						event.eventPurchases.unshift({ user: req.user.id, });
						event.save().then(event => res.json(purchasesToArrayLength(event.toObject())));
					}
				} else {
					errors.purchase = "This event does not exist";
					return res.status(404).json(errors);
				}
			})
			.catch(err => res.status(404).json(err));
	}
);

// @route   delete api/events/:eventId/unpurchase
// @desc		remove a purchase. Dev-mode
// @access  private
// router.delete(
// 	"/:eventId/unpurchase",
// 	passport.authenticate("jwt-user", { session: false, }),
// 	(req, res) => {
// 		const errors = {};
// 		const id = req.params.eventId;

// 		Event.findById(
// 			id,
// 			"+contactName +contactEmail +contactNumber +contactAddress"
// 		)
// 			.then(event => {
// 				if (event) {
// 					if (purchased(event, req.user.id)) {
// 						const purchaseIndex = event.eventPurchases.findIndex(purchase => purchase.user = req.user.id);
// 						purchaseIndex > -1 && event.eventPurchases.splice(purchased, 1);
// 						event.save();
// 						res.send("Event purchase deleted");
// 					}
// 				} else {
// 					errors.purchase = "This event does not exist";
// 					return res.status(404).json(errors);
// 				}
// 			})
// 			.catch(err => res.status(404).json(err));
// 	}
// );


// @route   PUT api/events/dev-edit
// @desc
// @access  private
// router.put("/dev-edit/:eventId", (req, res) => {
// 	const id = req.params.eventId;
// 	const errors = {};
// 	Event.findById(id)
// 		.then(event => {
// 			// event.set('buyer', undefined, {strict: false, } );
// 			// event.eventPurchases = [];
// 			// event.contactName = req.body.contactName,
// 			// event.contactEmail = req.body.contactEmail,
// 			// event.contactNumber = req.body.contactNumber,
// 			// event.contactAddress = req.body.contactAddress,
// 			event.eventDate = req.body.eventDate,
// 			event.eventDateEnd = req.body.eventDateEnd,
// 			event.save();
// 			res.json({ msg: "done",});
// 		});
// 	// Event.findOneAndUpdate({eventDate: "2018/8/01", }, {eventDate: "2018-08-01T18:00:00+0200", }, {new: true,})
// 	// 	.then(event => {
// 	// 		res.json(event);
// 	// 	});
// });

module.exports = router;
