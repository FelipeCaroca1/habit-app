const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000; // Puedes elegir cualquier puerto que no esté en uso

app.use(cors()); // Habilitar CORS para todas las rutas

app.get('/quote', async (req, res) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/random');
    res.json(response.data); // Envía la respuesta de ZenQuotes al cliente
  } catch (error) {
    res.status(500).json({ error: 'Error fetching quote' }); // Manejo de errores
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Mensaje en consola
});
