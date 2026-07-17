import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

import Role from "../src/models/roleModel";
import Campaign from "../src/models/campaignModel";
import CampaignProgress from "../src/models/roleModel";
import Merchant from "../src/models/merchantModel";
import MerchantTypes from "../src/models/merchantTypeModel";
import Staff from "../src/models/staffModel";
import User from "../src/models/userModel";

const roles = JSON.parse(
  fs.readFileSync(path.join(import.meta.dirname, "roles.json"), "utf-8"),
);
const campaignProgresses = JSON.parse(
  fs.readFileSync(
    path.join(import.meta.dirname, "campaignProgress.json"),
    "utf-8",
  ),
);
const campaigns = JSON.parse(
  fs.readFileSync(path.join(import.meta.dirname, "campaigns.json"), "utf-8"),
);
const merchants = JSON.parse(
  fs.readFileSync(path.join(import.meta.dirname, "merchants.json"), "utf-8"),
);
const merchantTypes = JSON.parse(
  fs.readFileSync(
    path.join(import.meta.dirname, "merchantTypes.json"),
    "utf-8",
  ),
);
const users = JSON.parse(
  fs.readFileSync(path.join(import.meta.dirname, "users.json"), "utf-8"),
);
const staffs = JSON.parse(
  fs.readFileSync(path.join(import.meta.dirname, "staff.json"), "utf-8"),
);

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Forcing shut down");
  console.log(err.name, err.message);

  process.exit(1);
});

dotenv.config({ path: "./config.env" });
console.log(process.env.DATABASE);

const DB = process.env.DATABASE!.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD!,
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
