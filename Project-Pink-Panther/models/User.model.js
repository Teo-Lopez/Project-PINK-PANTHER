const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true 
  },

  password: String,
  role: {
    type: String,
    enum: ['User', 'Admin'], 
    default: 'User'
  }
},
{
  timestamps: true
}
  );
  
const User = model("User", userSchema);

module.exports = User;
