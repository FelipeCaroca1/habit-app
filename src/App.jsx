import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Stats from './pages/Stats';
import About from './pages/About';
import Config from './pages/Config';
import { HabitsProvider } from './context/HabitsContext';
import { ProgressProvider } from './context/ProgressContext';
import MotivationalQuote from './components/MotivationalQuote'; 
import Footer from './components/Footer';
import './styles/index.css';

const AppContent = () => {
  const location = useLocation();

  return (
    <div>
      <Navbar />
      {/* Mostrar MotivationalQuote solo en Home y Stats */}
      {(location.pathname === '/' || location.pathname === '/stats') && <MotivationalQuote />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/about" element={<About />} />
        <Route path="/config" element={<Config />} />
      </Routes>
      <Footer /> 
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <HabitsProvider>
        <ProgressProvider>
          <AppContent />
        </ProgressProvider>
      </HabitsProvider>
    </Router>
  );
};

export default App;
