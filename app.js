require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
var PORT = 3500
var MONGODB_URI = "mongodb://localhost:27017"
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const auth_routes = require("./routes/auth.routes")
const key_routes = require("./routes/key.routes")

app.use("/api", auth_routes)
app.use("/api", key_routes)

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false)
    mongoose.connect(MONGODB_URI)
    app.listen(PORT, (error) => {
      if (error) {
        console.log("There was an error", error)
      } else {
        console.log(`Server started on port ${PORT}, mongodb connected`)
      }
    })
    console.log("Mongo connected")
  } catch (error) {
    console.log(error)
    process.exit()
  }
}

connectDB()
