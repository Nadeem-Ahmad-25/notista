const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    required: true,
    type: "string",
  },
  email: {
    required: true,
    type: "string",
    unique: true,
  },
  password: {
    required: true,
    type: "string",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", UserSchema);
