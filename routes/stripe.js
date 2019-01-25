const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const stripe = require("stripe")("sk_test_tkWceUpgzNphQ13Qr5qOElgd");

// router.post("/", (req, res) => {
// 	console.log(req.body.email, req.body.stripeToken);
// 	let amount = 500;

// 	stripe.customers
// 		.create({
// 			email: req.body.email,
// 			description: 'testcustomer',
// 			source: 'tok_visa',
// 		})
// 		.then(customer =>
// 			stripe.charges.create({
// 				amount,
// 				description: "Sample Charge",
// 				currency: "usd",
// 				customer: customer.id,
// 			})
// 		)
// 		.then(status => res.json(status))
// 		.catch(err => console.log(err));
// });

// charging a customer
router.post("/charge", (req, res) => {
	console.log(req.body);
	stripe.charges
		.create({
			amount: 100,
			currency: "eur",
			description: "An example for event purchase",
			customer: req.body.stripeCusID,
		})
		.then(status => res.json({ status }))
		.catch(err => res.status(500).json(err));
});

// // For later subscribe purpose
// router.post("/charge/subscribe", (req, res) => {
// 	stripe.charges
// 		.create({
// 			amount: 20000,
// 			currency: "eur",
// 			description: "Annual Subscription",
// 			customer: req.body.stripeCusID,
// 		})
// 		.then(status => res.json({ status }))
// 		.catch(err => res.status(500).json(err));
// });

// creating new customer
router.post("/new", async (req, res, next) => {
	try {
		const customersArray = await stripe.customers.list();
		const emails = customersArray.data.map(indvCustomer => indvCustomer.email);

		if (emails.includes(req.body.email)) {
			return res.status(500).send("Customer Already Exist !!");
		}

		const newCustomer = await stripe.customers.create({
			email: req.body.email,
			description: req.body.name,
			source: "tok_visa",
		});

		const subscribe = await stripe.charges.create({
			amount: 20000,
			currency: "eur",
			description: "Annual Subscription",
			customer: newCustomer.id,
		});

		const editedUser = await User.findByIdAndUpdate(
			req.body.id,
			{ stripeCusID: newCustomer.id },
			{ new: true }
		);
		console.log(editedUser);

		res.json({ editedUser });
	} catch (error) {
		res.status(422).json(error);
	}
});

module.exports = router;
