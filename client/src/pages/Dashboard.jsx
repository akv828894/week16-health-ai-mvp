import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuthStore } from '../store/authStore';
import { healthAPI, aiAPI } from '../api/endpoints';
import HealthMetricForm from '../components/HealthMetricForm';
import AIAssistant from '../components/AIAssistant';
import MetricsList from '../components/MetricsList';
import './Dashboard.css';

function Dashboard() {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      setLoading(true);
      const res = await healthAPI.getMetrics();
      setMetrics(res.data.data);
    } catch (err) {
      toast.error('Failed to load metrics');
    } finally {
      setLoading(false);
    }
  };

  const handleMetricAdded = async (newMetric) => {
    setMetrics([newMetric, ...metrics]);
    toast.success('✅ Metric recorded successfully!');
  };

  const handleLogout = () => {
    logout();
    toast.success('👋 Logged out');
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>💚 Health AI Dashboard</h1>
          <div className="header-right">
            <span className="user-greeting">Welcome, {user?.name}!</span>
            <button 
              className="menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
        </div>
      )}

      {/* Main Content */}
      <main className="dashboard-content">
        <div className="container">
          <div className="dashboard-grid">
            {/* Left Column - Form & AI */}
            <aside className="sidebar">
              <HealthMetricForm onMetricAdded={handleMetricAdded} />
              <AIAssistant metrics={metrics} />
            </aside>

            {/* Right Column - Metrics List */}
            <section className="main-section">
              <div className="section-header">
                <h2>📊 Your Health Metrics</h2>
                <span className="metric-count">{metrics.length} records</span>
              </div>

              {loading ? (
                <div className="loading">
                  <div className="spinner"></div>
                  <p>Loading your health metrics...</p>
                  <span className="loading-tip">This usually takes a few seconds</span>
                </div>
              ) : metrics.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📋</div>
                  <h3>No metrics recorded yet</h3>
                  <p>Start tracking your health today!</p>
                  <p className="empty-tip">Add your first metric using the form on the left →</p>
                </div>
              ) : (
                <MetricsList metrics={metrics} onRefresh={loadMetrics} />
              )}
            </section>
          </div>
        </div>
      </main>

      {/* Desktop Logout Button */}
      <button 
        className="logout-btn-desktop"
        onClick={handleLogout}
        title="Logout"
      >
        🚪
      </button>
    </div>
  );
}

export default Dashboard;
