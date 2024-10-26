// ProgressContext.jsx
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({
    Salud: 0,
    Productividad: 0,
    Creatividad: 0,
    completed: 0,
    pending: 0,
  });

  return (
    <ProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

ProgressProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
