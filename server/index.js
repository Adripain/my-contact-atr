require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const authRoutes = require("./routes/auth")
const requireAuth = require("./middleware/requireAuth")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("mongo ok"))
  .catch(e => console.log("mongo error", e))

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: { title: "API", version: "1.0.0" }
  },
  apis: ["./routes/*.js"]
}

const swaggerSpecs = swaggerJsdoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

app.use("/auth", authRoutes)

app.get("/protected", requireAuth, (req, res) => {
  res.json({ msg: "ok private", user: req.user })
})

app.listen(process.env.PORT || 3000, () => {
  console.log("server running")
})

//https://www.npmjs.com/package/swagger-jsdoc