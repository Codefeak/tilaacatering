const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const stripe = require("stripe")("sk_test_tkWceUpgzNphQ13Qr5qOElgd");

// For adding items to invoicing
// Subscription & pay per purchase both can be added as invoice items
router.post("/invoice/charge", async (req, res) => {
	await stripe.invoiceItems
		.create({
			amount: 750,
			currency: "eur",
			description: "Event Purchased",
			customer: req.body.stripeCusID,
		})
		.then(status => res.json({ status }))
		.catch(err => res.status(500).json(err));
});

// Create a new invoice
router.post("/invoice/createNew", async (req, res) => {
	await stripe.invoices.create({
				customer: req.body.stripeCusID,
				auto_advance: false,
			})
		.then(status => res.json({ status }))
		.catch(err => res.status(500).json(err));
});


// Retrive upcoming invoice
router.post("/invoice/upcoming", async (req, res) => {
	await stripe.invoices
		.retrieveUpcoming(req.body.stripeCusID)
		.then(status => res.json({ status }))
		.catch(err => res.status(500).json(err));
});

//Finalize invoice
router.post("/invoice/finalize", async (req, res) => {
	await stripe.invoices
		.finalizeInvoice(req.body.invoiceId)
		.then(status => res.json({ status }))
		.catch(err => res.status(500).json(err));
});


//Pay invoice
router.post("/invoice/pay", async (req, res) => {
	await stripe.invoices
		.pay(req.body.invoiceId)
		.then(status => res.json({ status }))
		.catch(err => res.status(500).json(err));
});

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
			// source: "tok_visa",
		});

		// Create invoice items for subscription and create new invoice.
		stripe.invoiceItems.create(
			{
				amount: 7500,
				currency: "eur",
				description: "Subscribed",
				customer: newCustomer.id,
			}
			// (err, invoiceItems) => {
			// 	stripe.invoices.create({
			// 		customer: newCustomer.id,
			// 		auto_advance: false,
			// 	});
			// }
		);

		const editedUser = await User.findByIdAndUpdate(
			req.body.id,
			{ stripeCusID: newCustomer.id },
			{ new: true }
		);
		res.json({ editedUser });
	} catch (error) {
		res.status(422).json(error);
	}
});
// Subscription Validation
router.post("/checkSubscription", (req, res) => {
	const list = stripe.customers.list();
	list.then(customer =>
		customer.data.some(customer => customer.email === req.body.email)
			? res.send("Subscribed")
			: res.send("No Data Matched")
	);
});

module.exports = router;
