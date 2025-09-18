const jwt = require("jsonwebtoken")

// https://stackoverflow.com/questions/34588407/how-to-verify-jwt-token-in-node-js
function requireAuth(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]
  if (!token) return res.status(401).json({ error: "no token" })

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "invalid token" })
    req.user = user
    next()
  })
}

module.exports = requireAuth
