import { useState } from 'react';
import ModalAddHabit from './ModalAddHabit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const MainContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habits, setHabits] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addHabit = (habit) => {
    setHabits([...habits, habit]);
    closeModal();
  };

  const deleteHabit = (index) => {
    const newHabits = habits.filter((_, i) => i !== index);
    setHabits(newHabits);
  };

  const startEditing = (index) => {
    setIsEditing(index);
    setEditText(habits[index]);
  };

  const saveEdit = (index) => {
    const updatedHabits = habits.map((habit, i) =>
      i === index ? editText : habit
    );
    setHabits(updatedHabits);
    setIsEditing(null);
  };

  return (
    <section className="main-content p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Tus Hábitos</h2>
      <div className="habit-list">
        {habits.length > 0 ? (
          <ul>
            {habits.map((habit, index) => (
              <li key={index} className="flex justify-between items-center mb-4 slide-in">
                {isEditing === index ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="habit-edit-input"
                  />
                ) : (
                  <span>{habit}</span>
                )}
                <div className="habit-buttons">
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
                    onClick={() => deleteHabit(index)}
                    className="habit-button"
                  >
                    <FontAwesomeIcon icon={faTrash} />
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

export default MainContent;
