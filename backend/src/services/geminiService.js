// backend/src/services/geminiService.js

const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.log('⚠️ GEMINI_API_KEY not found. AI features will use fallback.');
      this.isEnabled = false;
      return;
    }
    
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.7,
        topK: 1,
        topP: 0.8,
        maxOutputTokens: 1024,
      },
    });
    this.isEnabled = true;
    console.log('✅ Google Gemini initialized successfully');
  }

  // Generate UI recommendations from friction data
  async generateUIRecommendations(frictionData) {
    if (!this.isEnabled) {
      return this.getFallbackResponse();
    }

    try {
      const prompt = this.buildPrompt(frictionData);
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse JSON response
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return {
            layout: parsed.layout || 'Wizard',
            steps: parsed.steps || 3,
            buttonSize: parsed.buttonSize || 'Large',
            recommendations: parsed.recommendations || ['Split form into steps', 'Add progress bar'],
            estimatedReduction: parsed.estimatedReduction || 38,
            confidence: parsed.confidence || 67,
            estimatedImpact: parsed.estimatedImpact || {
              taskSuccess: 27,
              completionTime: -32,
              errorRate: -41,
              satisfaction: 31
            },
            designNotes: parsed.designNotes || '',
            summary: parsed.summary || 'Users struggle with this form due to excessive fields.'
          };
        }
        return this.parseFallback(text);
      } catch (parseError) {
        console.error('❌ Error parsing Gemini response:', parseError);
        return this.getFallbackResponse();
      }
      
    } catch (error) {
      console.error('❌ Gemini API Error:', error.message);
      return this.getFallbackResponse();
    }
  }

  buildPrompt(frictionData) {
    return `
You are a UX Expert specializing in simplifying complex interfaces.

Analyze the following friction report from AuraGen, a user behavior analysis tool.

## Friction Report
- Page: ${frictionData.page || 'Tax Form'}
- Friction Score: ${frictionData.frictionScore || 72}/100
- Level: ${frictionData.level || 'Medium'}
- Wrong Clicks: ${frictionData.wrongClicks || 0}
- Rage Clicks: ${frictionData.rageClicks || 0}
- Idle Time: ${frictionData.idleTime || 0} seconds
- Scroll Depth: ${frictionData.scrollDepth || 0}%
- Form Errors: ${frictionData.formErrors || 0}
- Completion Time: ${frictionData.duration || 0} seconds
- Main Reasons: ${(frictionData.reasons || ['Complex form']).join(', ')}

## Your Task
Based on this data, suggest UI improvements.

## Requirements
1. Return ONLY valid JSON
2. No markdown, no extra text
3. Use this exact structure:

{
  "layout": "Wizard",
  "steps": 3,
  "buttonSize": "Large",
  "recommendations": [
    "Split into three steps",
    "Highlight required fields",
    "Reduce optional inputs",
    "Increase button size",
    "Add progress bar"
  ],
  "estimatedReduction": 38,
  "confidence": 85,
  "estimatedImpact": {
    "taskSuccess": 27,
    "completionTime": -32,
    "errorRate": -41,
    "satisfaction": 31
  },
  "designNotes": "Convert the long form into a conversational step-by-step wizard with a progress indicator.",
  "summary": "Users struggle with this form due to excessive fields and lack of guidance."
}`;
  }

  parseFallback(text) {
    const lines = text.split('\n').filter(l => l.trim());
    const recommendations = [];
    let layout = 'Wizard';
    let steps = 3;
    let buttonSize = 'Large';
    let estimatedReduction = 30;

    for (const line of lines) {
      if (line.includes('Wizard') || line.includes('wizard')) layout = 'Wizard';
      if (line.includes('step') || line.includes('Step')) {
        const match = line.match(/\d+/);
        if (match) steps = parseInt(match[0]) || 3;
      }
      if (line.includes('reduce') || line.includes('Reduce')) {
        recommendations.push(line.trim());
      }
      if (line.includes('split') || line.includes('Split')) {
        recommendations.push(line.trim());
      }
      if (line.includes('highlight') || line.includes('Highlight')) {
        recommendations.push(line.trim());
      }
      if (line.includes('progress') || line.includes('Progress')) {
        recommendations.push(line.trim());
      }
    }

    if (recommendations.length === 0) {
      recommendations.push('Split form into multiple steps');
      recommendations.push('Highlight required fields');
      recommendations.push('Reduce optional inputs');
      recommendations.push('Add progress indicator');
    }

    return {
      layout: layout,
      steps: steps,
      buttonSize: buttonSize,
      recommendations: recommendations.slice(0, 5),
      estimatedReduction: estimatedReduction,
      confidence: 75,
      estimatedImpact: {
        taskSuccess: 27,
        completionTime: -32,
        errorRate: -41,
        satisfaction: 31
      },
      designNotes: 'Simplify the form using a wizard layout with clear progress indicators.',
      summary: 'Users are struggling with the current form. A step-by-step wizard will reduce cognitive load.'
    };
  }

  getFallbackResponse() {
    return {
      layout: 'Wizard',
      steps: 3,
      buttonSize: 'Large',
      recommendations: [
        'Split form into three steps',
        'Highlight required fields',
        'Reduce optional inputs',
        'Increase button size',
        'Add progress bar'
      ],
      estimatedReduction: 38,
      confidence: 67,
      estimatedImpact: {
        taskSuccess: 27,
        completionTime: -32,
        errorRate: -41,
        satisfaction: 31
      },
      designNotes: 'Convert the long form into a conversational step-by-step wizard with a progress indicator.',
      summary: 'Users struggle with this form due to excessive fields and lack of guidance.'
    };
  }
}

module.exports = new GeminiService();