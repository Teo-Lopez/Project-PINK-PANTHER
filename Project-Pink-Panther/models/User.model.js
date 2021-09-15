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
      enum: ["PEASANT", "AGENT"],
      default: "PEASANT",
    },

    avatarImg: {
      type: String,
      enum: ["https://res.cloudinary.com/dvk0p9wev/image/upload/v1631732354/KkrwCqU_ijftfm.png","https://res.cloudinary.com/dvk0p9wev/image/upload/v1631732518/agente_m5pcez.jpg"]
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
