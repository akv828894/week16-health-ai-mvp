import React, { useState } from 'react';
import { toast } from 'sonner';
import { useAuthStore } from '../store/authStore';
import { authAPI } from '../api/endpoints';
import './Auth.css';

function Login({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const setUser = useAuthStore(state => state.setUser);
  const setToken = useAuthStore(state => state.setToken);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await authAPI.login({ email, password });
      setToken(res.data.token);
      setUser(res.data.user);
      toast.success('✅ Login successful!');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Login failed';
      toast.error(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>💚 Health AI</h1>
          <p>Track your wellness with AI insights</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-mini"></span>
                Logging in...
              </>
            ) : (
              '🔑 Login'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? 
            <button type="button" onClick={onSwitch} className="link-btn">
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
