import React from 'react';
import { Toaster } from 'sonner';
import { useAuthStore } from './store/authStore';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const token = useAuthStore(state => state.token);
  const [currentPage, setCurrentPage] = React.useState(token ? 'dashboard' : 'login');

  return (
    <>
      <Toaster position="top-right" />
      {!token ? (
        currentPage === 'login' ? (
          <Login onSwitch={() => setCurrentPage('register')} />
        ) : (
          <Register onSwitch={() => setCurrentPage('login')} />
        )
      ) : (
        <Dashboard />
      )}
    </>
  );
}

export default App;
