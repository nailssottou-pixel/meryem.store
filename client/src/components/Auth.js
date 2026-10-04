import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isLogin) {
      const result = await login(formData.email, formData.password);
      if (!result.success) {
        setError(result.error);
      }
    } else {
      setError('Only admin can access. Please login with your credentials.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>👕 Meryem Store</h2>
        <p className="auth-subtitle">{isLogin ? 'Admin Login' : 'Admin Access'}</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="admin@meryem.store"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-toggle">
          {isLogin ? 'Need to sign up? ' : 'Already have credentials? '}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setFormData({ email: '', password: '' });
            }}
            className="link-btn"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>

        {isLogin && (
          <div className="auth-hint">
            <strong>Admin Credentials:</strong><br/>
            Email: admin@meryem.store<br/>
            Password: Meryem@2024#SecurePass99!
          </div>
        )}
      </div>
    </div>
  );
}

export default Auth;


