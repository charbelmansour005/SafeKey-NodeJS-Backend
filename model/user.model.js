const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter your email address"],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: 13,
  },
  name: {
    type: String,
    required: [false, "Please enter your name"],
  },
})

const User = mongoose.model("User", userSchema)

module.exports = User
