
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <h1 className="text-3xl font-bold">Habit App</h1>
      <div className="nav-buttons">
        <button className="nav-button">Home</button>
        <button className="nav-button">About</button>
        <button className="nav-button">Stats</button>
        <button className="nav-button">Config</button>
      </div>
    </nav>
  );
};

export default Navbar;
