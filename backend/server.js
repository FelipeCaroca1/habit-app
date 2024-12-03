require('dotenv').config(); // Importar dotenv
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Habilitar CORS y soporte para JSON
app.use(cors());
app.use(express.json()); // Para procesar el cuerpo de las solicitudes POST

// Ruta para obtener citas motivacionales desde ZenQuotes
app.get('/api/random', async (req, res) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/random'); // Llamada a la API de ZenQuotes
    res.json(response.data); // Enviar los datos obtenidos al frontend
  } catch (error) {
    console.error('Error fetching the quote:', error.message);
    res.status(500).send('Error fetching the quote.');
  }
});

// Ruta para traducir texto con Google Translate API
app.post('/api/translate', async (req, res) => {
  const { text, target } = req.body; // Obtener el texto y el idioma de destino desde el cuerpo de la solicitud

  try {
    const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY; // Cargar la clave desde el .env
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      {
        q: text,
        target: target,
      }
    );

    // Enviar el texto traducido al frontend
    res.json(response.data.data.translations[0].translatedText);
  } catch (error) {
    console.error('Error translating the text:', error.message);
    res.status(500).send('Error translating the text.');
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
