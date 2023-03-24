const jwt = require("jsonwebtoken")

const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization")
  {
    if (!authHeader) {
      return res.status(401).json({
        error: "Not authenticated, no headers",
      })
    }
  }

  const token = authHeader.split(" ")[1]
  let decodedToken

  try {
    decodedToken = jwt.verify(token, "somesupersecretsecret")
  } catch (err) {
    return res.status(500).json({
      error: "Not authenticated, no secret ..",
    })
  }
  if (!decodedToken) {
    return res.status(401).json({
      error: "Not authenticated",
    })
  }
  req.userId = decodedToken.userId
  next()
}

module.exports = { isAuth }
