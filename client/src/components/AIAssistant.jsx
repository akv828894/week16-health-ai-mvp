import React, { useState } from 'react';
import { toast } from 'sonner';
import { aiAPI } from '../api/endpoints';
import './AIAssistant.css';

function AIAssistant({ metrics }) {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAIRequest = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) {
      toast.error('Please enter a question');
      return;
    }

    setLoading(true);
    try {
      const res = await aiAPI.getHealthAssistant(prompt);
      setResult(res.data.data);
      setPrompt('');
      toast.success('✨ AI suggestion ready!');
    } catch (err) {
      toast.error('Failed to get AI suggestion');
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type) => {
    const icons = {
      'general': '📝',
      'warning': '⚠️',
      'tip': '💡'
    };
    return icons[type] || '📝';
  };

  return (
    <div className="ai-assistant-card">
      <h3>🤖 AI Health Assistant</h3>
      
      <form onSubmit={handleAIRequest} className="ai-form">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask anything about your health (e.g., 'How can I improve my heart rate?')"
          rows="3"
          disabled={loading}
          maxLength="500"
        />
        <div className="char-count">{prompt.length}/500</div>

        <button type="submit" className="btn btn-primary" disabled={loading || !prompt.trim()}>
          {loading ? (
            <>
              <span className="spinner-mini"></span>
              Getting AI suggestion...
            </>
          ) : (
            '✨ Get AI Suggestion'
          )}
        </button>
      </form>

      {result && (
        <div className={`ai-result result-${result.type || 'general'}`}>
          <div className="result-header">
            <span className="result-icon">{getTypeIcon(result.type)}</span>
            <h4>AI Suggestion</h4>
          </div>
          
          <p className="result-suggestion">{result.suggestion}</p>

          {result.actionable_steps && result.actionable_steps.length > 0 && (
            <div className="action-steps">
              <h5>💪 Action Steps:</h5>
              <ul>
                {result.actionable_steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>
          )}

          <button 
            className="close-result"
            onClick={() => setResult(null)}
            title="Close"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default AIAssistant;
