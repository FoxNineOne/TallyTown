const path = require("path");
const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const morgan = require("morgan");
const app = express();

// Logging if in Dev
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`You are in DEV`);
}

// Data sanitisation against NoSQL query injections
app.use(mongoSanitize());

// Data sanitisation against cross-site scripting attacks (XSS)
app.use(xss());

module.exports = app;
