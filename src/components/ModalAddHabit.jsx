import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ModalAddHabit = ({ isOpen, onClose, addHabit }) => {
  const [newHabit, setNewHabit] = useState('');
  const [category, setCategory] = useState('');
  const [isClosing, setIsClosing] = useState(false);

  const handleAddHabit = () => {
    if (newHabit.trim() !== '' && category !== '') {
      addHabit({ name: newHabit, category });
      setNewHabit('');
      setCategory('');
    }
  };

  const handleClose = () => {
    setIsClosing(true);
  };

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        setIsClosing(false);
        onClose();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  if (!isOpen && !isClosing) return null;

  return (
    <div className={`modal-overlay ${isClosing ? 'hiding' : 'showing'}`}>
      <div className="modal-content">
        <h2 className="text-2xl font-bold mb-4">Añadir un nuevo hábito</h2>
        <input
          type="text"
          placeholder="Escribe el hábito..."
          className="p-2 w-full mb-4 border rounded"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <div className="select-wrapper">
          <select
            className="p-2 w-full mb-4 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Selecciona una categoría</option>
            <option value="Salud">Salud</option>
            <option value="Productividad">Productividad</option>
            <option value="Creatividad">Creatividad</option>
          </select>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleAddHabit}
          >
            Guardar
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={handleClose}
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
