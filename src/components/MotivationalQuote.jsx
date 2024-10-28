import { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = 'AIzaSyDekSyR3u3uHYLNdeIZj6YVs6Ye9Z-fRpM'; // Coloca aquí tu clave de API

const MotivationalQuote = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get('/api/api/random');
        const data = response.data[0];

        // Traducir la cita al español usando la API REST de Google Cloud Translation
        const translateResponse = await axios.post(
          `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
          {
            q: data.q,
            target: 'es'
          }
        );

        setQuote(translateResponse.data.data.translations[0].translatedText);
        setAuthor(data.a);
      } catch (error) {
        console.error("Error fetching the quote or translating it", error);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="motivational-quote bg-gray-800 text-white p-4 rounded-lg shadow-lg">
      <p>&quot;{quote}&quot;</p>
      <p className="author">- {author}</p>
    </div>
  );
};

export default MotivationalQuote;
