const Role = require("../models/roleModel");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const fs = require("fs");
const roles = JSON.parse(fs.readFileSync(`${__dirname}/roles.json`, "utf-8"));

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Forcing shut down");
  console.log(err.name, err.message);

  process.exit(1);
});

dotenv.config({ path: "./config.env" });
console.log(process.env.DATABASE);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

const importData = async () => {
  try {
    let result;
    //Role
    result = await Role.insertMany(roles);
    console.log(result);
    console.log("Role Data Imported");

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

mongoose.connect(DB).then(async () => {
  console.log("DB Connection successful");
  console.log("Attempting Insert of Data");
  await importData();
});
