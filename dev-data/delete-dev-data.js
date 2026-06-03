const Role = require("../models/roleModel.js");
const CampaignProgress = require("../models/campaignProgressModel");

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
    console.log("Attemping Role data");
    result = await Role.deleteMany();
    console.log(result);
    // Campaign Progress
    console.log("Attempting Campaign Progress data");
    result = await CampaignProgress.deleteMany();
    console.log(result);
    //campaigns
    console.log("Attempting Campaign Data");
    result = await Campaign.deleteMany();
    console.log(result);
    //Merchants
    console.log("Attempting Merchant Data");
    result = await Merchant.deleteMany();
    console.log(result);
    //Merchant Types
    console.log("Attempting Merchant Data");
    result = await MerchantTypes.deleteMany();
    console.log(result);
    //staff
    console.log("Attempting Staff Data");
    result = await Staff.deleteMany();
    console.log(result);
    ///user
    console.log("Attempting User Data");
    result = await User.deleteMany();
    console.log(result);
    console.log("Process Complete. Exiting.");
    process.exit();
    // Finish
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

mongoose.connect(DB).then(async () => {
  console.log("DB Connection successful");
  console.log("Attempting Removal of Data");
  await deleteData();
});
