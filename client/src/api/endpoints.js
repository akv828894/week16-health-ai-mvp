import API from './client.js';

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data)
};

export const healthAPI = {
  getMetrics: () => API.get('/health/metrics'),
  addMetric: (data) => API.post('/health/metrics', data),
  getSummary: () => API.get('/health/summary')
};

export const aiAPI = {
  getHealthAssistant: (prompt) => API.post('/ai/health-assistant', { prompt })
};
