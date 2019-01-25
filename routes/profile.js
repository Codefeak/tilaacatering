const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const Event = require("../models/Event");
const { check, validationResult, } = require("express-validator/check");

router.get(
	"/:userId",
	passport.authenticate("jwt-user", { session: false, }),
	(req, res) => {
		const errors = {};
		User.findOne({ _id: req.params.userId, })
			.then(user => {
				if (user.id === req.user.id) {
					const { _id, name, email, company, phone, } = user;
					res.json({ _id, name, email, company, phone, });
				} else {
					errors.noUser = "The user does not exit";
					return res.status(404).json(errors);
				}
			})
			.catch(err => res.status(404).json(err));
	}
);

router.get(
	"/:userId/purchasedEvents",
	passport.authenticate("jwt-user", { session: false, }),
	(req, res) => {
		const errors = {};
		Event.find().then(events => {
			if (events) {
				let purchasedEvents = [];
				events.forEach(event => {
					if (
						event.eventPurchases.filter(
							item => item.user.toString() === req.user.id
						).length > 0
					) {
						purchasedEvents.push(event);
					}
				});
				res.json({ events: purchasedEvents, });
			}
		});
	}
);

router.put(
	"/:userId",
	passport.authenticate("jwt-user", { session: false, }),
	[
		check("name")
			.optional({ nullable: true, })
			.isLength({ min: 2, max: 20, })
			.withMessage("Full name must be between 2 and 20 characters")
			.not()
			.matches("[0-9]")
			.withMessage("Full name cannot contain number"),
		check("email")
			.optional({ nullable: true, })
			.isEmail()
			.withMessage("Email is invalid"),
		check("company")
			.optional({ nullable: true, })
			.isLength({ min: 2, max: 20, })
			.withMessage("Company name must be between 2 and 20 characters"),
		check("phone")
			.optional({ nullable: true, })
			.matches("^[0-9]{10}")
			.withMessage("phone number must be of 10 digits"),
	],
	(req, res) => {
		const errors = validationResult(req).formatWith(({ msg, param, }) => ({
			[param]: msg,
		}));
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array(), });
		}
		const id = req.params.userId;

		User.findByIdAndUpdate(id, req.body, { new: true, })
			.then(user => {
				if (user) {
					const { _id, name, email, company, phone, } = user;
					res
						.status(200)
						.json({
							_id,
							name,
							email,
							company,
							phone,
							msg: "Profile info was successfully updated",
						});
				} else {
					res
						.status(404)
						.json({ errors: [{ updateUser: "User doesnot exist", },], });
				}
			})
			.catch(e => res.send(e));
	}
);

router.delete("/delete", (req, res) => {
	User.deleteMany({}, err=>res.send(err));
	User.find(items=> console.log(items));
});

module.exports = router;
