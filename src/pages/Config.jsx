import { useState } from 'react';

const Config = () => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('es');
  const [notifications, setNotifications] = useState(true);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    document.body.className = e.target.value; 
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleNotificationsChange = () => {
    setNotifications(!notifications);
  };

  return (
    <div className="config-container">
      <h1 className="config-title">Configuraciones</h1>

      <div className="config-item">
        <label>Seleccionar tema:</label>
        <select onChange={handleThemeChange} value={theme} className="config-select">
          <option value="light">Claro</option>
          <option value="dark">Oscuro</option>
        </select>
      </div>

      <div className="config-item">
        <label>Seleccionar idioma:</label>
        <select onChange={handleLanguageChange} value={language} className="config-select">
          <option value="es">Español</option>
          <option value="en">Inglés</option>
        </select>
      </div>

      <div className="config-item">
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={handleNotificationsChange}
            className="config-checkbox"
          />
          Activar notificaciones
        </label>
      </div>
      
      <button className="button-back">Guardar Cambios</button>
    </div>
  );
};

export default Config;
