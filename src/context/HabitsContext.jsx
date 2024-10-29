
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const HabitsContext = createContext();

export const HabitsProvider = ({ children }) => {
  const [habits, setHabits] = useState(() => {
    const savedHabits = sessionStorage.getItem('habits');
    return savedHabits ? JSON.parse(savedHabits) : [];
  });

  useEffect(() => {
    sessionStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  return (
    <HabitsContext.Provider value={{ habits, setHabits }}>
      {children}
    </HabitsContext.Provider>
  );
};

HabitsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
