import express from 'express';
import HealthMetric from '../models/HealthMetric.js';
import { auth } from '../middleware/auth.js';
import { healthMetricSchema, validateRequest } from '../utils/validation.js';

const router = express.Router();

// Get all metrics for user
router.get('/metrics', auth, async (req, res) => {
  try {
    const metrics = await HealthMetric.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ 
      success: true,
      count: metrics.length,
      data: metrics 
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch metrics', details: err.message });
  }
});

// Add health metric
router.post('/metrics', auth, validateRequest(healthMetricSchema), async (req, res) => {
  try {
    const metric = new HealthMetric({
      userId: req.userId,
      ...req.validated
    });

    await metric.save();
    res.status(201).json({ 
      success: true,
      message: 'Metric recorded successfully',
      data: metric 
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record metric', details: err.message });
  }
});

// Get metric summary
router.get('/summary', auth, async (req, res) => {
  try {
    const metrics = await HealthMetric.find({ userId: req.userId });
    
    const summary = {
      totalMetrics: metrics.length,
      byType: {}
    };

    metrics.forEach(m => {
      if (!summary.byType[m.type]) {
        summary.byType[m.type] = [];
      }
      summary.byType[m.type].push(m);
    });

    res.json({ success: true, data: summary });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch summary', details: err.message });
  }
});

export default router;
