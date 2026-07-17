import path from "path";
import express from "express";

//import mongoSanitize from "express-mongo-sanitize";
//import xss from "xss-clean";
import morgan from "morgan";
import cors from "cors";
const app = express();

import campaignRouter from "./routes/campaignRoutes.js";
import campaignProgressRouter from "./routes/campaignProgressRoutes.js";
import authRouter from "./routes/authRoutes.js";
import viewRouter from "./routes/viewRoutes.js";

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

export default app;
