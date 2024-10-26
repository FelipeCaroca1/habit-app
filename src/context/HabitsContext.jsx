// HabitsContext.jsx
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const HabitsContext = createContext();

export const HabitsProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);

  return (
    <HabitsContext.Provider value={{ habits, setHabits }}>
      {children}
    </HabitsContext.Provider>
  );
};

HabitsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
