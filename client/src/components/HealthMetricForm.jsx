import React, { useState } from 'react';
import { toast } from 'sonner';
import { healthAPI } from '../api/endpoints';
import './HealthMetricForm.css';

const METRIC_TYPES = [
  { value: 'weight', label: '⚖️ Weight (kg)', unit: 'kg' },
  { value: 'blood_pressure', label: '💉 Blood Pressure (mmHg)', unit: 'mmHg' },
  { value: 'heart_rate', label: '❤️ Heart Rate (bpm)', unit: 'bpm' },
  { value: 'calories', label: '🔥 Calories (kcal)', unit: 'kcal' },
  { value: 'steps', label: '👟 Steps', unit: 'steps' },
  { value: 'water_intake', label: '💧 Water (ml)', unit: 'ml' }
];

function HealthMetricForm({ onMetricAdded }) {
  const [type, setType] = useState('weight');
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const selectedMetric = METRIC_TYPES.find(m => m.value === type);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!value || isNaN(value) || value <= 0) {
      toast.error('Please enter a valid value');
      return;
    }

    setLoading(true);
    try {
      const res = await healthAPI.addMetric({
        type,
        value: parseFloat(value),
        unit: selectedMetric.unit,
        notes
      });

      onMetricAdded(res.data.data);
      setType('weight');
      setValue('');
      setNotes('');
    } catch (err) {
      toast.error('Failed to record metric');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="metric-form-card">
      <h3>➕ Add Health Metric</h3>
      
      <form onSubmit={handleSubmit} className="metric-form">
        <div className="form-group">
          <label htmlFor="type">Metric Type</label>
          <select 
            id="type"
            value={type} 
            onChange={(e) => setType(e.target.value)}
            disabled={loading}
          >
            {METRIC_TYPES.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="value">
            Value ({selectedMetric?.unit})
          </label>
          <input
            id="value"
            type="number"
            step="0.1"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes (Optional)</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes..."
            rows="3"
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-mini"></span>
              Saving...
            </>
          ) : (
            '💾 Save Metric'
          )}
        </button>
      </form>
    </div>
  );
}

export default HealthMetricForm;
