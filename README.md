# My Contact ATR

Application web simple pour gérer des contacts avec **authentification**.  
Projet fullstack Node.js + React + MongoDB.

---

## 🔹 Fonctionnalités

### Backend (Express + MongoDB)
- Authentification JWT :  
  - `POST /auth/register` → créer un utilisateur  
  - `POST /auth/login` → login, récupère un token  
- CRUD contacts :  
  - `GET /api/contacts` → liste des contacts  
  - `POST /api/contacts` → ajouter un contact  
  - `PATCH /api/contacts/:id` → modifier un contact  
  - `DELETE /api/contacts/:id` → supprimer un contact  
- Swagger : [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Frontend (React)
- Affichage liste de contacts  
- Ajouter / modifier / supprimer un contact  
- Communication via fetch API avec le backend  

---

## 🔹 Prérequis

- Node.js >= 18  
- MongoDB (Atlas ou local)  
- npm  

---

## 🔹 Installation

### 1️⃣ Backend

```bash
cd server
npm install
