import React from 'react';
import './MetricsList.css';

function MetricsList({ metrics }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMetricIcon = (type) => {
    const icons = {
      weight: '⚖️',
      blood_pressure: '💉',
      heart_rate: '❤️',
      calories: '🔥',
      steps: '👟',
      water_intake: '💧'
    };
    return icons[type] || '📊';
  };

  // Group metrics by type
  const groupedMetrics = metrics.reduce((acc, metric) => {
    if (!acc[metric.type]) acc[metric.type] = [];
    acc[metric.type].push(metric);
    return acc;
  }, {});

  return (
    <div className="metrics-list">
      {Object.entries(groupedMetrics).map(([type, typeMetrics]) => (
        <div key={type} className="metric-group">
          <div className="group-header">
            <h4>{getMetricIcon(type)} {type.replace(/_/g, ' ').toUpperCase()}</h4>
            <span className="count">{typeMetrics.length}</span>
          </div>

          <div className="metrics-table-wrapper">
            <table className="metrics-table">
              <thead>
                <tr>
                  <th>Value</th>
                  <th>Date</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {typeMetrics.map((metric) => (
                  <tr key={metric._id} className="metric-row">
                    <td className="value-cell">
                      <strong>{metric.value}</strong> {metric.unit}
                    </td>
                    <td className="date-cell">{formatDate(metric.createdAt)}</td>
                    <td className="notes-cell">{metric.notes || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MetricsList;
