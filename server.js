const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const usersRouter = require("./routes/users");
const profileRouter = require("./routes/profile");
const eventsRouter = require("./routes/events");
const chargeRouer = require("./routes/stripe");

let app = express();
app.use(cors());

//process.env.PORT for using the remote port when hosted
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false, }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client/build")));
app.use(require("body-parser").text());

app.use("/api/users", usersRouter);
app.use("/api/profile", profileRouter);
app.use("/api/events", eventsRouter);
app.use("/stripe", chargeRouer);

//getting mongoURI fron mLab and connecting to mongoDB
const db = require("./config/keys").mongoURI;
mongoose
	.connect(
		db,
		{ useNewUrlParser: true, }
	)
	.then(() => console.log("MongoDB connected"))
	.catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

app.get("*", (req, res) => {
	app.use(express.static(path.join(__dirname, "/client/build/index.html")));
});
app.listen(port, () => console.log(`Server is running on port ${port}`));
