import { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = 'AIzaSyDekSyR3u3uHYLNdeIZj6YVs6Ye9Z-fRpM';

const MotivationalQuote = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [animate, setAnimate] = useState(true); 
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        // Llamar backend para obtener una cita
        const response = await axios.get('http://localhost:5000/quote'); 
        const data = response.data[0];

        // Traducción de la cita al español
        const translateResponse = await axios.post(
          `https://translation.googleapis.com/language/translate/v2`,
          {},
          {
            params: {
              key: apiKey,
              q: data.q, // Texto en inglés
              target: 'es', // Idioma de destino
            },
          }
        );

        const translatedQuote = translateResponse.data.data.translations[0].translatedText;

        
        setQuote(translatedQuote);
        setAuthor(data.a); // El autor de la cita
        setAnimate(true); // Activar el efecto de entrada
      } catch (error) {
        console.error("Error fetching or translating the quote", error);
      }
    };

    fetchQuote(); // Obtener una nueva frase cada vez que se carga el componente
  }, []);

  return (
    <div className={`motivational-quote ${animate ? 'fade-in' : ''} bg-gray-800 text-white p-4 rounded-lg shadow-lg`}>
      <p>&quot;{quote}&quot;</p>
      <p className="author">- {author}</p>
    </div>
  );
};

export default MotivationalQuote;
