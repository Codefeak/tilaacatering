const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secret = require("../config/keys").secret;
const { check, validationResult, } = require("express-validator/check");

/* Sign up user*/
router.post(
	"/register",
	[
		check("name")
			.exists({ checkFalsy: true, })
			.withMessage("Full name is required")
			.isLength({ min: 2, max: 20, })
			.withMessage("Full name must be between 2 and 20 characters")
			.not()
			.matches("[0-9]")
			.withMessage("Full name cannot contain number"),
		check("email")
			.not()
			.isEmpty()
			.withMessage("Email is required")
			.isEmail()
			.withMessage("Email is invalid"),
		check("password")
			.exists({ checkFalsy: true, })
			.withMessage("Password is required")
			.matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
			.withMessage(
				"Password must be at least 8 characters in length, in which contain at least 1 number, 1 capitalized character and 1 symbol"
			),
		check("company")
			.exists({ checkFalsy: true, })
			.withMessage("Company is required")
			.isLength({ min: 2, max: 20, })
			.withMessage("Company name must be between 2 and 20 characters"),
		check("phone")
			.exists({ checkFalsy: true, })
			.withMessage("Phone number is required")
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
		User.findOne({ email: req.body.email, }).then(user => {
			if (user) {
				return res
					.status(400)
					.json({ errors: [{ email: "email already exists", },], });
			} else {
				const newUser = new User({
					name: req.body.name,
					email: req.body.email,
					company: req.body.company,
					password: req.body.password,
					phone: req.body.phone,
					stripeCusID: req.body.stripeCusID,
				});
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) {
							res.json(err);
						} else {
							newUser.password = hash;
							newUser
								.save()
								.then(user => res.json(user))
								.catch(err => res.json(err));
						}
					});
				});
			}
		});
	}
);

//login and send token
router.post(
	"/login",
	[
		check("email")
			.not()
			.isEmpty()
			.withMessage("Email is required")
			.isEmail()
			.withMessage("Email is invalid"),
		check("password")
			.not()
			.isEmpty()
			.withMessage("Password is required"),
	],
	(req, res) => {
		const errors = validationResult(req).formatWith(({ msg, param, }) => ({
			[param]: msg,
		}));
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array(), });
		}
		const email = req.body.email;
		const password = req.body.password;
		User.findOne({ email, }).then(user => {
			if (!user) {
				return res
					.status(404)
					.json({ errors: [{ email: "This user does not exist yet", },], });
			}
			//Check the password
			bcrypt.compare(password, user.password).then(isMatched => {
				if (isMatched) {
					const payload = { id: user._id, name: user.name, };
					const token = jwt.sign(payload, secret, {
						expiresIn: "6h",
					});
					res.cookie("jwt_token", token, { httpOnly: true, });
					return res.json({
						id: user.id,
						name: user.name,
						company: user.company,
						email: user.email,
						phone: user.phone,
						stripeCusID: user.stripeCusID,
					});
				} else {
					return res.status(400).json({ password: "Password incorrect", });
				}
			});
		});
	}
);

//logging out user
router.get("/logout", (req, res) => {
	res.clearCookie("jwt_token");
	res.send("cleared cookie");
});

router.get(
	"/current",
	passport.authenticate("jwt-user", { session: false, }),
	(req, res) => {
		res.json({
			id: req.user.id,
			name: req.user.name,
			email: req.user.email,
			stripeCusID: req.user.stripeCusID,
		});
	}
);

module.exports = router;
