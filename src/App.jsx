import Navbar from './components/Navbar';
import './styles/index.css';

function App() {
  return (
    <div>
      <Navbar />
      <div className="pt-24">
        <h1 className="text-white text-center text-4xl">¡Bienvenido a tu app de hábitos futurista!</h1>
      </div>
    </div>
  );
}

export default App;
