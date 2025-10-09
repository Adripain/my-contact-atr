import React, { useEffect, useState } from "react";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      alert("Vous devez être connecté pour accéder à vos contacts !");
      window.location.href = "/login";
      return;
    }
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/contacts");
      const data = await res.json();
      setContacts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erreur fetch contacts:", err);
      setContacts([]);
    }
  };

  const addContact = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, phone }),
      });
      const data = await res.json();
      setFirstName("");
      setLastName("");
      setPhone("");
      fetchContacts();
    } catch (err) {
      console.error("Erreur ajout contact:", err);
    }
  };

  const deleteContact = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/contacts/${id}`, { method: "DELETE" });
      fetchContacts();
    } catch (err) {
      console.error("Erreur suppression contact:", err);
    }
  };

  const updateContact = async (id) => {
    const newPhone = prompt("Nouveau numéro ?");
    if (!newPhone) return;
    try {
      await fetch(`http://localhost:3000/api/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: newPhone }),
      });
      fetchContacts();
    } catch (err) {
      console.error("Erreur mise à jour contact:", err);
    }
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
