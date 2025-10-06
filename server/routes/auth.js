const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const router = express.Router()


// stackoverflow.com/questions/9203532/how-to-document-express-js-api-using-swagger
router.post("/register", async (req, res) => {
  const { email, password } = req.body
  const exist = await User.findOne({ email })
  if (exist) return res.status(400).json({ error: "déjà inscrit" })

  const hash = await bcrypt.hash(password, 10)
  const u = new User({ email, password: hash })
  await u.save()
  res.json({ msg: "ok" })
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  const u = await User.findOne({ email })
  if (!u) return res.status(400).json({ error: "not found" })

  const valid = await bcrypt.compare(password, u.password)
  if (!valid) return res.status(400).json({ error: "wrong pass" })

  const token = jwt.sign({ id: u._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
  res.json({ token })
})

module.exports = router

router.get('/', function(req, res) {
  res.send('respond with a resource');
});