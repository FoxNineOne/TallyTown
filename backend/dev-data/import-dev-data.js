const Role = require("../models/roleModel.js");
const CampaignProgress = require("../models/campaignProgressModel.js");
const Campaign = require("../models/campaignModel.js");
const Merchant = require("../models/merchantModel.js");
const MerchantTypes = require("../models/merchantTypeModel.js");
const User = require("../models/userModel.js");
const Staff = require("../models/staffModel.js");

const mongoose = require("mongoose");
const dotenv = require("dotenv");

const fs = require("fs");
const roles = JSON.parse(fs.readFileSync(`${__dirname}/roles.json`, "utf-8"));
const campaignProgresses = JSON.parse(
  fs.readFileSync(`${__dirname}/campaignProgress.json`, "utf-8"),
);
const campaigns = JSON.parse(
  fs.readFileSync(`${__dirname}/campaigns.json`, "utf-8"),
);
const merchants = JSON.parse(
  fs.readFileSync(`${__dirname}/merchants.json`, "utf-8"),
);
const merchantTypes = JSON.parse(
  fs.readFileSync(`${__dirname}/merchantTypes.json`, "utf-8"),
);
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
const staffs = JSON.parse(fs.readFileSync(`${__dirname}/staff.json`, "utf-8"));

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
    //campaignProgress
    result = await CampaignProgress.insertMany(campaignProgresses);
    console.log(result);
    console.log("Campaign Progress-es Data Imported");
    //campaigns
    result = await Campaign.insertMany(campaigns);
    console.log(result);
    console.log("Campaign Data Imported");
    //merchants
    result = await Merchant.insertMany(merchants);
    console.log(result);
    console.log("Merchant Data Imported");
    //merchant types
    result = await MerchantTypes.insertMany(merchantTypes);
    console.log(result);
    console.log("Merchant Types Imported");
    //staff
    result = await Staff.insertMany(staffs);
    console.log(result);
    console.log("Staff Imported");
    ///user
    result = await User.insertMany(users);
    console.log(result);
    console.log("Users Imported");
    //FINISH
    console.log("Importing complete. Exiting");
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
