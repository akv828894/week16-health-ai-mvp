import mongoose from 'mongoose';

const HealthMetricSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['weight', 'blood_pressure', 'heart_rate', 'calories', 'steps', 'water_intake'],
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  unit: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('HealthMetric', HealthMetricSchema);
