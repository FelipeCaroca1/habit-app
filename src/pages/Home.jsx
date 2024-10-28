import { useState, useContext } from 'react';
import ModalAddHabit from '../components/ModalAddHabit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { ProgressContext } from '../context/ProgressContext';
import { HabitsContext } from '../context/HabitsContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { habits, setHabits } = useContext(HabitsContext);
  const { addPendingHabit, completeHabit, uncompleteHabit, deleteHabit } = useContext(ProgressContext); 
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
    setIsEditing(null);
  };

  const closeModal = () => setIsModalOpen(false);

  const addHabit = (habit) => {
    setHabits([...habits, { ...habit, completed: false }]);
    addPendingHabit(habit.category);
    closeModal();
  };

  const deleteHabitFromList = (index) => {
    const habitToDelete = habits[index];
    const newHabits = habits.filter((_, i) => i !== index);
    setHabits(newHabits);
    deleteHabit(habitToDelete.category, habitToDelete.completed);
  };

  const startEditing = (index) => {
    setIsEditing(index);
    setEditText(habits[index].name);
  };

  const saveEdit = (index) => {
    const updatedHabits = habits.map((habit, i) =>
      i === index ? { ...habit, name: editText } : habit
    );
    setHabits(updatedHabits);
    setIsEditing(null);
  };

  const toggleComplete = (index) => {
    const updatedHabits = habits.map((habit, i) =>
      i === index ? { ...habit, completed: !habit.completed } : habit
    );
    setHabits(updatedHabits);
  
    const habitCategory = habits[index].category;
    const isCompleted = !habits[index].completed;
  
    if (isCompleted) {
      completeHabit(habitCategory);
    } else {
      uncompleteHabit(habitCategory);
    }
  };

  const filteredHabits = filter
    ? habits.filter(
        (habit) =>
          habit.category === filter ||
          (filter === 'Completado' && habit.completed) ||
          (filter === 'Pendiente' && !habit.completed)
      )
    : habits;

  return (
    <section className="main-content p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Tus Hábitos</h2>

      <div className="mb-4">
        <label htmlFor="filter" className="mr-2">Filtrar por categoría o estado:</label>
        <select
          id="filter"
          className="p-2 border rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="Salud">Salud</option>
          <option value="Productividad">Productividad</option>
          <option value="Creatividad">Creatividad</option>
          <option value="Completado">Completado</option>
          <option value="Pendiente">Pendiente</option>
        </select>
      </div>

      <div className="habit-list">
        {filteredHabits.length > 0 ? (
          <ul>
            {filteredHabits.map((habit, index) => (
              <li key={index} className="flex justify-between items-center mb-4 slide-in">
                {isEditing === index ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="habit-edit-input"
                  />
                ) : (
                  <span>
                    {habit.name} - <em>{habit.category}</em> - {habit.completed ? 'Completado' : 'Pendiente'}
                  </span>
                )}
                <div className="habit-buttons">
                  <button
                    onClick={() => toggleComplete(index)}
                    className={`habit-button ${habit.completed ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    style={{ border: habit.completed ? '1px solid #00bfff' : 'none' }}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                  {isEditing === index ? (
                    <button
                      onClick={() => saveEdit(index)}
                      className="habit-button bg-green-500 text-white hover:bg-green-700"
                    >
                      Guardar
                    </button>
                  ) : (
                    <button
                      onClick={() => startEditing(index)}
                      className="habit-button"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteHabitFromList(index)}
                    className="habit-button"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button
                    onClick={() => navigate('/stats')}
                    className="habit-button bg-gray-300 hover:bg-gray-500"
                  >
                    <FontAwesomeIcon icon={faChartBar} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay hábitos añadidos aún.</p>
        )}
      </div>
      
      <button
        className="add-habit-button bg-blue-500 text-white p-4 rounded-full mt-6 hover:bg-blue-700"
        onClick={openModal}
      >
        Añadir Hábito
      </button>

      <ModalAddHabit isOpen={isModalOpen} onClose={closeModal} addHabit={addHabit} />
    </section>
  );
};

export default Home;
