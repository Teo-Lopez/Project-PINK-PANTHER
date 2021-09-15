const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    counter: {
      type: Number,
    },

    role: {
      type: String,
      enum: ["PEASANT", "AGENT"],
      default: "PEASANT",
    },

    avatarImg: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
