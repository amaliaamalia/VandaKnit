import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import './styles/main.scss';
import Register from './components/Register';
import Catalog from './components/Catalog';
import ManageProducts from './components/ManageProducts';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Catalog />} />
        <Route path="/admin" element={<ManageProducts />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
