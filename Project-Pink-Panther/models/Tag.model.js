const { Schema, model } = require("mongoose");

const tagSchema = new Schema(
  {
    name: String,
    //lowercase: true,
    // unique: true,
    //required: true,
  },
  {
    timestamps: true,
  }
);

const Tag = model("Tag", tagSchema);

module.exports = Tag;
