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
      default: 0,
    },

    role: {
      type: String,
      enum: ["PEASANT", "AGENT", "ARCHITECT"],
      default: "PEASANT",
    },

    avatarImg: {
      type: String,
      enum: [
        "https://res.cloudinary.com/dvk0p9wev/image/upload/v1631871243/PEASANT_lygsl4.jpg",
        "https://res.cloudinary.com/dvk0p9wev/image/upload/v1631871271/ARCHITECT_gdlm36.gif",
        "https://res.cloudinary.com/dvk0p9wev/image/upload/v1631871376/AGENTE_nq2v6b.jpg",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
