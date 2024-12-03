import { useState, useEffect } from 'react';
import axios from 'axios';

const MotivationalQuote = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [translatedQuote, setTranslatedQuote] = useState('');

  useEffect(() => {
    const fetchAndTranslateQuote = async () => {
      try {
        const quoteResponse = await axios.get('http://localhost:5000/api/random');
        const quoteData = quoteResponse.data[0];
        const originalQuote = quoteData.q;
        const authorName = quoteData.a;

        setQuote(originalQuote);
        setAuthor(authorName);

        const translationResponse = await axios.post('http://localhost:5000/api/translate', {
          text: originalQuote,
          target: 'es',
        });

        setTranslatedQuote(translationResponse.data);
      } catch (error) {
        console.error("Error fetching or translating the quote:", error);
        setQuote('Lo que no te mata te hace más fuerte');
        setAuthor('Friedrich Nietzsche');
        setTranslatedQuote('Lo que no te mata te hace más fuerte');
      }
    };

    fetchAndTranslateQuote();
  }, []);

  return (
    <div className="motivational-quote bg-gray-800 text-white p-4 rounded-lg shadow-lg">
      <p className="text-lg font-bold">{translatedQuote || quote}</p>
      <p className="author text-sm italic">- {author}</p>
    </div>
  );
};

export default MotivationalQuote;
