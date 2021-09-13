const { Schema, model } = require("mongoose");

const tagSchema = new Schema(
  {
    tagname: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tag = model("Tag", tagSchema);

module.exports = Tag;
