const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String },
})

module.exports = mongoose.model("Contact", contactSchema)