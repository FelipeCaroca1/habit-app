import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <h1 className="text-3xl font-bold">Habit App</h1>
      <div className="nav-buttons">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/about" className="nav-button">About</Link>
        <Link to="/stats" className="nav-button">Stats</Link>
        <Link to="/config" className="nav-button">Config</Link>
      </div>
    </nav>
  );
};

export default Navbar;
