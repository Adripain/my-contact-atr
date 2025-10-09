const express = require("express")
const Contact = require("../models/Contact")
const requireAuth = require("../middleware/requireAuth"); // ton middleware JWT

const router = express.Router()

// === CRUD /contacts ===
// - GET /contacts (liste des contacts)
// - POST /contacts (création)
// - PATCH /contacts/:id (modif partielle)
// - DELETE /contacts/:id (suppression)

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Test route
 *     responses:
 *       200:
 *         description: Returns a test message.
 */
router.get("/test", (req, res) => {
  res.send("Route contacts OK")
})

// GET tous les contacts
/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Retrieve a list of contacts
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 60c72b2f9b1e8e5a5c8f9e1d
 *                   firstName:
 *                     type: string
 *                     example: John
 *                   lastName:
 *                     type: string
 *                     example: Doe
 *                   phone:
 *                     type: string
 *                     example: 123-456-7890
 */
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
/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               phone:
 *                 type: string
 *                 example: 123-456-7890
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 60c72b2f9b1e8e5a5c8f9e1d
 *                 firstName:
 *                   type: string
 *                   example: John
 *                 lastName:
 *                   type: string
 *                   example: Doe
 *                 phone:
 *                   type: string
 *                   example: 123-456-7890
 */
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
/**
 * @swagger
 * /contacts/{id}:
 *   patch:
 *     summary: Update a contact partially
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               phone:
 *                 type: string
 *                 example: 123-456-7890
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 60c72b2f9b1e8e5a5c8f9e1d
 *                 firstName:
 *                   type: string
 *                   example: John
 *                 lastName:
 *                   type: string
 *                   example: Doe
 *                 phone:
 *                   type: string
 *                   example: 123-456-7890
 *       404:
 *         description: Contact not found
 */
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
/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     responses:
 *       204:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 */ 
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
