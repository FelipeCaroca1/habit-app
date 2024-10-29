import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(() => {
    const savedProgress = sessionStorage.getItem('progress');
    return savedProgress
      ? JSON.parse(savedProgress)
      : {
          Salud: 0,
          Productividad: 0,
          Creatividad: 0,
          completed: 0,
          pending: 0,
        };
  });

  useEffect(() => {
    sessionStorage.setItem('progress', JSON.stringify(progress));
  }, [progress]);

  const addPendingHabit = (category) => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      [category]: prevProgress[category] + 1,
      pending: prevProgress.pending + 1,
    }));
  };

  const completeHabit = (category) => {
    setProgress((prevProgress) => {
      // Solo incrementar si el hábito está marcado como completado
      if (prevProgress[category] >= 0) {
        return {
          ...prevProgress,
          [category]: prevProgress[category] + 1,
          completed: prevProgress.completed + 1,
          pending: Math.max(prevProgress.pending - 1, 0),
        };
      }
      return prevProgress; // No se hace nada si el hábito no está completado
    });
  };
  
  const uncompleteHabit = (category) => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      [category]: Math.max(prevProgress[category] - 1, 0), // Asegurar que no sea negativo
      completed: Math.max(prevProgress.completed - 1, 0), // Asegurar que no sea negativo
      pending: prevProgress.pending + 1, // Incrementar los pendientes
    }));
  };
  

  const deleteHabit = (category, isCompleted) => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      [category]: Math.max(prevProgress[category] - 1, 0),
      completed: isCompleted ? Math.max(prevProgress.completed - 1, 0) : prevProgress.completed,
      pending: isCompleted ? prevProgress.pending : Math.max(prevProgress.pending - 1, 0),
    }));
  };

  return (
    <ProgressContext.Provider value={{ progress, addPendingHabit, completeHabit, uncompleteHabit, deleteHabit }}>
      {children}
    </ProgressContext.Provider>
  );
};

ProgressProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
