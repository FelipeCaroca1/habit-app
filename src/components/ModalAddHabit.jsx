import { useState } from 'react';
import PropTypes from 'prop-types';

const ModalAddHabit = ({ isOpen, onClose, addHabit }) => {
  const [newHabit, setNewHabit] = useState('');

  const handleAddHabit = () => {
    if (newHabit.trim() !== '') {
      addHabit(newHabit);
      setNewHabit(''); // Limpiamos el input después de añadir el hábito
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-2xl font-bold mb-4">Añadir un nuevo hábito</h2>
        <input
          type="text"
          placeholder="Escribe el hábito..."
          className="p-2 w-full mb-4 border rounded"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleAddHabit}
          >
            Guardar
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

ModalAddHabit.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    addHabit: PropTypes.func.isRequired,
  };


export default ModalAddHabit;
