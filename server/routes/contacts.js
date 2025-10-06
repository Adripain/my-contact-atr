const express = require("express")
const Contact = require("../models/Contact")

const router = express.Router()

module.exports = router

//CRUD /contacts
//- GET /contacts (scope user).
//- POST /contacts (création).
//- PATCH /contacts/:id (update partiel).
//- DELETE /contacts/:id (suppression).

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Retrieve a list of contacts
*/
router.get('/contacts' , function(req, res) {
    const contacts = await Contact.find();
    res.json(contacts);
});

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
*/
router.post('/contacts', async function(req, res) {
    const { firstName, lastName, phone } = req.body;
    const newContact = new Contact({ firstName, lastName, phone });
    await newContact.save();
    res.status(201).json(newContact);
});

/**
 * @swagger
 * /contacts/{id}:
 *   patch:
 *     summary: Update a contact by ID
*/
router.patch('/contacts/:id', async function(req, res) {
    const { id } = req.params;
    const updates = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedContact) {
        return res.status(404).json({ error: "Contact not found" });
    }
    res.json(updatedContact);
});

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID
*/
router.delete('/contacts/:id', async function(req, res) {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
        return res.status(404).json({ error: "Contact not found" });
    }
    res.status(204).end();
});
