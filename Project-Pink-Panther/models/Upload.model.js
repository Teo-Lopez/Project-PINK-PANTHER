const { Schema, model } = require("mongoose");

const uploadSchema = new Schema({
  tagName: String,
  img: String,
  location: {
        type: {
        type: String
        },
        coordinates: [Number]
    }
},
{
  timestamps: true
}
  );

// uploadSchema.index({ location: '2dsphere' })


const Upload = model("Upload", uploadSchema);

module.exports = Upload;
