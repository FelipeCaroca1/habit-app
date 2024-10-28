import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Stats from './pages/Stats';
import About from './pages/About';
import Config from './pages/Config';
import { HabitsProvider } from './context/HabitsContext';
import { ProgressProvider } from './context/ProgressContext';
import MotivationalQuote from './components/MotivationalQuote'; // Importamos el nuevo componente de la cita motivacional

const App = () => {
  return (
    <Router>
      <HabitsProvider>
        <ProgressProvider>
          <div>
            <Navbar />
            {/* Insertamos la cita motivacional justo debajo del Navbar */}
            <MotivationalQuote />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/about" element={<About />} />
              <Route path="/config" element={<Config />} />
            </Routes>
          </div>
        </ProgressProvider>
      </HabitsProvider>
    </Router>
  );
};

export default App;
