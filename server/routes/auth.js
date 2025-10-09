const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const router = express.Router()

//CRUD - Authentification :
//  - POST /auth/register (hash bcrypt).
//  - POST /auth/login (JWT).
//  - Middleware requireAuth (protection des routes).

// stackoverflow.com/questions/9203532/how-to-document-express-js-api-using-swagger

/**
 * @swagger
  * /register:
  *  post:
  *   summary: Register a new user
  *  requestBody:
  *   required: true
  *  content:
  *    application/json:
  *    schema:
  *    type: object
  *    properties:
  *    email:
  *    type: string
  *   example:
  *    email:
  *   type: string
  *   password:
  *  type: string
  *  example:
  *   password: mypassword
  * responses:
  * 201:
  *   description: User created successfully
  * 400:
  *   description: Bad request (e.g., missing fields, email already in use)
*/
router.post("/register", async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: "missing email or password" })
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ error: "email already in use" })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = new User({ email, password: hashedPassword })
  await newUser.save()
  res.status(201).json({ msg: "user created" })
})

/**
 * @swagger
 * /login:
 *  post:
 *  summary: Login a user
 * requestBody:
 *  required: true
 * content:
 *   application/json:
 *   schema:
 *   type: object
 *  properties:
 *  email:
 *  type: string
 *  example:
 *  email:
 * type: string
 * password:
 * type: string
 * example:
 * password: mypassword
 * responses:
 * 200:
 * description: Login successful, returns JWT token
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * token:
 * type: string
 * example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 * 400:
 * description: Invalid credentials or missing fields
*/
router.post("/login", async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: "missing email or password" })
  }

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).json({ error: "invalid credentials" })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return res.status(400).json({ error: "invalid credentials" })
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  )
  res.json({ token })
})

module.exports = router