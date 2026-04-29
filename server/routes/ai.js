import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { auth } from '../middleware/auth.js';
import HealthMetric from '../models/HealthMetric.js';
import User from '../models/User.js';
import { z } from 'zod';

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const aiRequestSchema = z.object({
  prompt: z.string().min(1, 'Prompt required').max(500, 'Prompt too long')
});

// Health Assistant - Get AI health suggestions
router.post('/health-assistant', auth, async (req, res) => {
  try {
    // Validate request
    const { prompt } = aiRequestSchema.parse(req.body);

    // Get user data
    const user = await User.findById(req.userId).select('-password');
    const metrics = await HealthMetric.find({ userId: req.userId }).limit(10);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Format context for AI
    const metricsContext = metrics.map(m => 
      `${m.type}: ${m.value} ${m.unit || ''}`
    ).join(', ');

    const systemPrompt = `You are a helpful health assistant. You provide health suggestions based on user data. 
    Always respond with a JSON object in this format ONLY:
    {
      "suggestion": "your health suggestion here",
      "type": "general|warning|tip",
      "actionable_steps": ["step 1", "step 2"]
    }
    Do NOT include markdown, backticks, or any text outside the JSON object.`;

    const userPrompt = `User: ${user.name}, Age: ${user.age || 'not specified'}
    Recent metrics: ${metricsContext || 'none'}
    Question: ${prompt}
    
    Provide a health suggestion as JSON.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: userPrompt }]
        }
      ],
      systemInstruction: systemPrompt
    });

    const responseText = result.response.text();
    
    // Parse JSON response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ 
        error: 'Invalid AI response format',
        raw: responseText 
      });
    }

    const suggestion = JSON.parse(jsonMatch[0]);

    res.json({
      success: true,
      data: suggestion,
      timestamp: new Date()
    });

  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: err.errors });
    }
    
    res.status(500).json({ 
      error: 'AI request failed',
      details: err.message 
    });
  }
});

export default router;
