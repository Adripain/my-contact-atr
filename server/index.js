require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const authRoutes = require("./routes/auth")
const contactRoutes = require("./routes/contacts")
const requireAuth = require("./middleware/requireAuth")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const cors = require("cors")

const app = express()
app.use(express.json())

app.use(cors())


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

app.use("/api", contactRoutes) 

app.get("/protected", requireAuth, (req, res) => {
  res.json({ msg: "ok private", user: req.user })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log("server running on port", PORT)
})


//https://www.npmjs.com/package/swagger-jsdoc