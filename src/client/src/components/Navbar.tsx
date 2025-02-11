import { Link } from 'react-router-dom';
import '../styles/navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="brand">
        <Link to="/">VandaKnit</Link>
      </div>
      <ul className="links">
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/basket">Basket</Link></li>
        <li><Link to="/orders">Orders</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;