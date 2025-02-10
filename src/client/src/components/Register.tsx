import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/auth/AuthSlice';
import { RootState, AppDispatch } from '../app/store';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.scss';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(register({ email, password }));
    if (register.fulfilled.match(result)) {
      navigate('/login');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Register;
