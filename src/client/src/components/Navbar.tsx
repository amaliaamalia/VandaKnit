import { Link } from 'react-router-dom';
import '../styles/navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <h1>
          <Link to="/">VandaKnit</Link>
        </h1>
        <ul>
          <li><Link to="/admin">Admin</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
