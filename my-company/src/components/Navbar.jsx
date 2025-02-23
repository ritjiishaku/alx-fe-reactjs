import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ backgroundColor: '#333', padding: '10px', display: 'flex', justifyContent: 'center' }}>
      <Link to="/" style={{ margin: '10px', color: '#fff', textDecoration: 'none' }}>Home</Link>
      <Link to="/about" style={{ margin: '10px', color: '#fff', textDecoration: 'none' }}>About</Link>
      <Link to="/services" style={{ margin: '10px', color: '#fff', textDecoration: 'none' }}>Services</Link>
      <Link to="/contact" style={{ margin: '10px', color: '#fff', textDecoration: 'none' }}>Contact</Link>
    </nav>
  );
}

export default Navbar;