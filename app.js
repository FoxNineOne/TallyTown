const path = require("path");
const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const morgan = require("morgan");
const app = express();

const campaignRouter = require("./routes/campaignRoutes");

// Logging if in Dev
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`You are in DEV`);
}

// Data sanitisation against NoSQL query injections
// Not supporting Express5 yet!
//app.use(mongoSanitize());

// Data sanitisation against cross-site scripting attacks (XSS)
// ALSO NOT SUPPORT Express 5!
//app.use(xss());

// Routes
app.use("/api/v1/campaigns", campaignRouter);

module.exports = app;
