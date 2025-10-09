const express = require("express")
const Contact = require("../models/Contact")
const requireAuth = require("../middleware/requireAuth"); // ton middleware JWT

const router = express.Router()

// === CRUD /contacts ===
// - GET /contacts (liste des contacts)
// - POST /contacts (création)
// - PATCH /contacts/:id (modif partielle)
// - DELETE /contacts/:id (suppression)

router.get("/test", (req, res) => {
  res.send("Route contacts OK")
})

// GET tous les contacts
router.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find()
    res.json(contacts)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Erreur serveur" })
  }
})

// POST un contact
router.post("/contacts", async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body
    const newContact = new Contact({ firstName, lastName, phone })
    await newContact.save()
    res.status(201).json(newContact)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Erreur création contact" })
  }
})

// PATCH un contact
router.patch("/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body
    const updatedContact = await Contact.findByIdAndUpdate(id, updates, { new: true })
    if (!updatedContact) return res.status(404).json({ error: "Contact non trouvé" })
    res.json(updatedContact)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Erreur mise à jour" })
  }
})

// DELETE un contact
router.delete("/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Contact.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ error: "Contact non trouvé" })
    res.status(204).end()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Erreur suppression" })
  }
})

module.exports = router
