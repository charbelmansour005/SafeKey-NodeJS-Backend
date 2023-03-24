const mongoose = require("mongoose")

const keySchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title for your Key"],
  },
  safeKey: {
    type: String,
    required: [true, "Please provide the key "],
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  updated_At: { type: Date, default: Date.now() },
})

const Keys = mongoose.model("Keys", keySchema)

module.exports = Keys
