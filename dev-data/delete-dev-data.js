const Role = require("../models/roleModel");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

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

const deleteData = async () => {
  try {
    let result;
    //Role
    result = await Role.deleteMany();
    console.log(result);
    console.log("Data deleted");

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

mongoose.connect(DB).then(async () => {
  console.log("DB Connection successful");
  console.log("Attempting Removal of Data");
  await deleteData();
});
