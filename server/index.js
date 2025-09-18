require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MGDB Atlas'))
  .catch(err => console.error('error with mangond ', err));


app.get('/', (req, res) => {
  res.json({ message: 'TEst' });
});


app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
