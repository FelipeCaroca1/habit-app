import { useState, useEffect } from 'react';
import axios from 'axios';

const MotivationalQuote = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [translatedQuote, setTranslatedQuote] = useState('');

  useEffect(() => {
    const fetchAndTranslateQuote = async () => {
      try {
        console.log("Fetching quote from ZenQuotes API...");
        const quoteResponse = await axios.get('https://zenquotes.io/api/random');
        if (quoteResponse.data && quoteResponse.data.length > 0) {
          const quoteData = quoteResponse.data[0];
          const originalQuote = quoteData.q;
          const authorName = quoteData.a;

          setQuote(originalQuote);
          setAuthor(authorName);

          try {
            console.log("Translating quote...");
            const API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
            const translationResponse = await axios.post(
              `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
              {
                q: originalQuote,
                target: 'es',
              }
            );
            setTranslatedQuote(translationResponse.data.data.translations[0].translatedText);
          } catch (translationError) {
            console.error("Error during translation:", translationError);
          }
        } else {
          throw new Error("No quotes found in the API response");
        }
      } catch (quoteError) {
        console.error("Error fetching the quote:", quoteError);
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
