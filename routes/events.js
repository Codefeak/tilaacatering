const express = require("express");
const router = express.Router();
const passport = require("passport");
const { check, validationResult, } = require("express-validator/check");
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

const purchased = (event, userId) =>
	event.eventPurchases.some(purchase => purchase.user.toString() === userId);

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
router.post(
	"/",
	[
		check("eventDate")
			.exists({ checkFalsy: true, })
			.withMessage("Event date is a required field")
			// .matches("^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$")
			.isISO8601()
			.withMessage(
				"Date format is not recognized. Input must be a valid ISO 8601 date string with UTC timezone."
			),
		check("eventDateEnd")
			.exists({ checkFalsy: true, })
			.withMessage("Event end date is a required field")
			.isISO8601()
			.withMessage(
				"Date format is not recognized. Input must be a valid ISO 8601 date string with UTC timezone."
			),
		check("eventGuests")
			.exists({ checkFalsy: true, })
			.withMessage("The number of guests is a required field")
			.isInt({ min: 1, allow_leading_zeroes: false, })
			.withMessage("Guests must be a number, and should be more than 0."),
		check("eventType")
			.exists({ checkFalsy: true, })
			.withMessage("Event type is a required field")
			.isIn([
				"Catering only",
				"Catering and venue",
				"Catering and program",
				"Turnkey package",
			])
			.withMessage(
				"Must be one of the following: 'Catering only', 'Catering and venue', 'Catering and program' or 'Turnkey package'"
			),
		check("eventRegion")
			.exists({ checkFalsy: true, })
			.withMessage("Event region is a required field")
			.isLength({ min: 2, max: 20, })
			.withMessage("Event region must be between 2 and 20 characters"),
		check("eventFreeMessage")
			.optional({ nullable: true, })
			.isLength({ max: 500, })
			.withMessage("Free message has a maximum of 500 characters"),
		check("contactName")
			.exists({ checkFalsy: true, })
			.withMessage("Name is required")
			.isLength({ min: 2, max: 20, })
			.withMessage("Full name must be between 2 and 20 characters")
			.not()
			.matches("[0-9]")
			.withMessage("Full name cannot contain number"),
		check("contactEmail")
			.not()
			.isEmpty()
			.withMessage("Email is required")
			.isEmail()
			.withMessage("Email is invalid"),
		check("contactNumber")
			.exists({ checkFalsy: true, })
			.withMessage("Phone number is required")
			.matches("^[0-9]{10}")
			.withMessage("phone number must be of 10 digits"),
		check("contactAddress")
			.exists({ checkFalsy: true, })
			.withMessage("Address is required")
			.trim()
			.isLength({ min: 1, max: 100, })
			.withMessage("Invalid address"),
	],
	(req, res) => {
		const errors = validationResult(req).formatWith(({ msg, param, }) => ({
			[param]: msg,
		}));
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array(), });
		}
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
	}
);

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
router.put("/:eventId",
[
	check("eventDate")
		.optional({ nullable: true, })
		.isISO8601()
		.withMessage(
			"Date format is not recognized. Input must be a valid ISO 8601 date string with UTC timezone."
		),
	check("eventDateEnd")
		.optional({ nullable: true, })
		.isISO8601()
		.withMessage(
			"Date format is not recognized. Input must be a valid ISO 8601 date string with UTC timezone."
		),
	check("eventGuests")
		.optional({ nullable: true, })
		.isInt({ min: 1, allow_leading_zeroes: false, })
		.withMessage("Guests must be a number, and should be more than 0."),
	check("eventType")
		.optional({ nullable: true, })
		.isIn([
			"Catering only",
			"Catering and venue",
			"Catering and program",
			"Turnkey package",
		])
		.withMessage(
			"Must be one of the following: 'Catering only', 'Catering and venue', 'Catering and program' or 'Turnkey package'"
		),
	check("eventRegion")
		.optional({ nullable: true, })
		.isLength({ min: 2, max: 20, })
		.withMessage("Event region must be between 2 and 20 characters"),
	check("eventFreeMessage")
		.optional({ nullable: true, })
		.isLength({ max: 500, })
		.withMessage("Free message has a maximum of 500 characters"),
	check("contactName")
		.optional({ nullable: true, })
		.isLength({ min: 2, max: 20, })
		.withMessage("Full name must be between 2 and 20 characters")
		.not()
		.matches("[0-9]")
		.withMessage("Full name cannot contain number"),
	check("contactEmail")
		.optional({ nullable: true, })
		.not()
		.isEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Email is invalid"),
	check("contactNumber")
		.optional({ nullable: true, })
		.matches("^[0-9]{10}")
		.withMessage("phone number must be of 10 digits"),
	check("contactAddress")
		.optional({ nullable: true, })
		.trim()
		.isLength({ min: 1, max: 100, })
		.withMessage("Invalid address"),
],
(req, res) => {
	const id = req.params.eventId;
	const errors = {};
	Event.findByIdAndUpdate(id, req.body, { new: true, }).then(event => {
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
						event
							.save()
							.then(event =>
								res.json(purchasesToArrayLength(event.toObject()))
							);
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
