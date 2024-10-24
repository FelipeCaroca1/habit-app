import  { useState } from 'react';
import ModalAddHabit from './ModalAddHabit';

const MainContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado de la modal
  const [habits, setHabits] = useState([]); // Lista de hábitos

  const openModal = () => {
    setIsModalOpen(true); // Cambia el estado a true para abrir la modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cambia el estado a false para cerrar la modal
  };

  const addHabit = (habit) => {
    setHabits([...habits, habit]);
    closeModal(); // Cierra la modal después de agregar el hábito
  };

  // Aquí agregamos la función deleteHabit que estaba faltando
  const deleteHabit = (index) => {
    const newHabits = habits.filter((_, i) => i !== index);
    setHabits(newHabits);
  };

  return (
    <section className="main-content p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Tus Hábitos</h2>
      <div className="habit-list">
        {habits.length > 0 ? (
          <ul>
            {habits.map((habit, index) => (
              <li key={index} className="flex justify-between items-center mb-4">
                <span>{habit}</span>
                <button
                  onClick={() => deleteHabit(index)} // Aquí usamos deleteHabit
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
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
