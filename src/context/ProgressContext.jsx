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

  // Guardar progreso en sessionStorage
  useEffect(() => {
    sessionStorage.setItem('progress', JSON.stringify(progress));
  }, [progress]);

  // Función para agregar un nuevo hábito pendiente
  const addPendingHabit = (category) => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      [category]: prevProgress[category] + 1,
      pending: prevProgress.pending + 1,
    }));
  };

  // Función para marcar un hábito como completado
  const completeHabit = (category) => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      [category]: prevProgress[category] + 1,
      completed: prevProgress.completed + 1,
      pending: Math.max(prevProgress.pending - 1, 0),
    }));
  };
  // Función para desmarcar un hábito completado (volver a pendiente)
  const uncompleteHabit = (category) => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      [category]: Math.max(prevProgress[category] - 1, 0),
      completed: Math.max(prevProgress.completed - 1, 0),
      pending: prevProgress.pending + 1,
    }));
  };

  // Función para eliminar un hábito
  const deleteHabit = (category, isCompleted) => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      [category]: prevProgress[category] - 1,
      completed: isCompleted ? prevProgress.completed - 1 : prevProgress.completed,
      pending: isCompleted ? prevProgress.pending : prevProgress.pending - 1,
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
