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
    role: {
      type: String,
      enum: ["Peasant", "Agent", "Architect", "Wachowski Brother"],
      default: "Peasant",
    },
    avatarImg: {
      type: String,
      enum: [""],
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
