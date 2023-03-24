const User = require("../model/user.model")
var nodemailer = require("nodemailer")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secret = "somesupersecretsecret"

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "charbelmansour005@gmail.com",
    pass: "encxvodkkuczlxdv",
  },
})

async function postLogin(req, res) {
  const email = req.body.email
  const password = req.body.password

  const user = await User.findOne({ email: email })

  if (!user) {
    return res
      .status(401)
      .json({ Error: "A user with this email could not be found" })
  }

  const isEqual = await bcrypt.compare(password, user.password)

  if (!isEqual) {
    return res.status(401).json({ Error: "Invalid Credentials!" })
  }

  let loadedUser
  loadedUser = user

  const token = jwt.sign(
    {
      email: loadedUser.email,
      userId: loadedUser._id.toString(),
    },
    secret,
    { expiresIn: "1h" }
  )

  res.status(200).json({ token: token })
}

async function putSignUp(req, res) {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password

  const user = await User.findOne({ email: email })

  if (user) {
    res.status(409).json({ Conflict: "A user with this email already exists" })
    return
  }

  const hashedPassword = await bcrypt.hash(password, 12)
  const authenticatedUser = new User({
    name: name,
    email: email,
    password: hashedPassword,
  })
  authenticatedUser.save()
  transporter.sendMail({
    to: email,
    from: "employees@node-complete.com",
    html: "<h1>Welcome! Thank you for choosing us.</h1>",
  })
  res.status(200).json({
    Success: "Signed up!",
  })
}

module.exports = { postLogin, putSignUp }
