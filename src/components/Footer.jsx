
const Footer = () => {
  return (
    <footer className="footer-container">
      <p className="footer-text">&copy; {new Date().getFullYear()} Felipe Caroca | Cohorte 15 | Para fines académicos. </p>
      <p> HabitApp. Todos los derechos reservados.</p>
      <p className="footer-text">
        <a href="https://www.example.com" className="footer-link">Política de privacidad</a> | 
        <a href="https://www.example.com" className="footer-link">Términos de servicio</a>
      </p>
    </footer>
  );
};

export default Footer;
