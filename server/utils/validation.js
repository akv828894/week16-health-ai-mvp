import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  age: z.number().min(1).max(150).optional()
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password required')
});

export const healthMetricSchema = z.object({
  type: z.enum(['weight', 'blood_pressure', 'heart_rate', 'calories', 'steps', 'water_intake']),
  value: z.number().positive('Value must be positive'),
  unit: z.string().optional(),
  notes: z.string().optional()
});

export const validateRequest = (schema) => (req, res, next) => {
  try {
    const validated = schema.parse(req.body);
    req.validated = validated;
    next();
  } catch (error) {
    res.status(400).json({ 
      error: 'Validation failed', 
      details: error.errors 
    });
  }
};
