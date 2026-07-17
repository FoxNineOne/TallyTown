//import crypto from "crypto";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email Address is required"],
    unique: true,
    lowercase: true,
    validate: [
      validator.isEmail,
      "Please ensure you use a valid email address",
    ],
  },
  //photo: { type: String, default: "default.jpg" },
  role: {
    type: String,
    enum: ["user", "merchant_admin", "merchant_staff", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Password provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: false,
    validate: {
      // This only works on CRATE and SAVE!!! Not on update
      validator: function (el: string): boolean {
        return el === this.password;
      },
      message: "Please ensure the passwords match",
    },
  },
  reference: {
    type: String,
    required: false, // will generate after
    minlength: 8,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  passwordChangedAt: {
    type: Date,
  },
  //passwordResetToken: String,
  //passwordResetExpires: Date,
  active: { type: Boolean, default: true, select: false },
});

//instance method
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

/*
userSchema.pre("save", async function (next) {
  // Only runs if password was modified
  if (!this.isModified("password")) return next();

  // Hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000; //accomodate for JWT token generation
  next();
});

userSchema.pre(/^find/, function (next) {
  //this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

*/

// userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
//   if (this.passwordChangedAt) {
//     const changedTimestamp = parseInt(
//       this.passwordChangedAt.getTime() / 1000,
//       10,
//     );
//     //console.log(changedTimestamp, JWTTimestamp);
//     return JWTTimestamp < changedTimestamp;
//   }
//   //Not changed
//   return false;
// };

// userSchema.methods.createPasswordResetToken = function () {
//   const resetToken = crypto.randomBytes(32).toString("hex");
//   this.passwordResetToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   console.log({ resetToken }, this.passwordResetToken);

//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //10 minutes

//   // unencrypted is returned via email to user
//   return resetToken;
// };

const User = mongoose.model("User", userSchema);

export default User;
