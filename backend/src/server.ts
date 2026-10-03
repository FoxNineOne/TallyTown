import mongoose from "mongoose";
import dotenv from "dotenv";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Forcing shut down");
  console.log(err.name, err.message);

  process.exit(1);
});

dotenv.config({ path: "config.env" });
//console.log(process.cwd());
//console.log(process.env.DATABASE);
import app from "./app.js";

const DB = process.env.DATABASE!.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD!,
);

mongoose.connect(DB).then(() => {
  console.log("DB Connection successful");
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Forcing shut down");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("Process Terminated.");
  });
});
