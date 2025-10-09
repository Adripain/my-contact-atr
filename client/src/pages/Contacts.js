import React, { useEffect, useState } from "react";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/contacts");
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error("Erreur fetch contacts:", err);
    }
  };

  const addContact = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, phone }),
    });
    setFirstName("");
    setLastName("");
    setPhone("");
    fetchContacts();
  };

  const deleteContact = async (id) => {
    await fetch(`http://localhost:3000/api/contacts/${id}`, { method: "DELETE" });
    fetchContacts();
  };

  const updateContact = async (id) => {
    const newPhone = prompt("Nouveau numéro ?");
    if (!newPhone) return;
    await fetch(`http://localhost:3000/api/contacts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: newPhone }),
    });
    fetchContacts();
  };

  return (
    <div>
      <h2>Mes Contacts</h2>
      <ul>
        {contacts.map((c) => (
          <li key={c._id}>
            {c.firstName} {c.lastName} - {c.phone}{" "}
            <button onClick={() => updateContact(c._id)}>Modifier</button>{" "}
            <button onClick={() => deleteContact(c._id)}>Supprimer</button>
          </li>
        ))}
      </ul>

      <h3>Ajouter un contact</h3>
      <form onSubmit={addContact}>
        <input
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          placeholder="Téléphone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default Contacts;
