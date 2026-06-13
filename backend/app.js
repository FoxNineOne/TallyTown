const path = require("path");
const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const campaignRouter = require("./routes/campaignRoutes");
const campaignProgressRouter = require("./routes/campaignProgressRoutes");
const authRouter = require("./routes/authRoutes");
const viewRouter = require("./routes/viewRoutes");
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

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Parse JSON
app.use(express.json());

// Routes
app.use("/api/v1/campaign", campaignRouter);
app.use("/api/v1/campaignprogress", campaignProgressRouter);
app.use("/api/v1/login", authRouter);

app.use("/", viewRouter);

module.exports = app;
