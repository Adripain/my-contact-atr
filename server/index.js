const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.json({ message: 'TEst' });
});

app.listen(PORT, () => {
  console.log(` Serveur sur http://localhost:${PORT}`);
});
