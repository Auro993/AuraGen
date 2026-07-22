const mongoose = require('mongoose');

const generatedUISchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  page: {
    type: String,
    default: 'Tax Form'
  },
  originalScore: {
    type: Number,
    default: 72
  },
  optimizedScore: {
    type: Number,
    default: 38
  },
  layout: {
    type: String,
    enum: ['Wizard', 'Single Page', 'Split', 'Cards'],
    default: 'Wizard'
  },
  steps: {
    type: Number,
    default: 3
  },
  buttonSize: {
    type: String,
    enum: ['Small', 'Medium', 'Large'],
    default: 'Large'
  },
  recommendations: [{
    type: String
  }],
  removedFields: {
    type: Number,
    default: 5
  },
  estimatedImpact: {
    taskSuccess: { type: Number, default: 27 },
    completionTime: { type: Number, default: -32 },
    errorRate: { type: Number, default: -41 },
    satisfaction: { type: Number, default: 31 },
    frictionReduced: { type: Number, default: 38 }
  },
  reasons: [{
    type: String
  }],
  model: {
    type: String,
    default: 'Gemini 2.5 Flash'
  },
  generationTime: {
    type: String,
    default: '2.48 sec'
  },
  confidence: {
    type: Number,
    default: 67
  },
  status: {
    type: String,
    enum: ['generated', 'applied', 'rejected'],
    default: 'generated'
  },
  designNotes: {
    type: String,
    default: ''
  },
  summary: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('GeneratedUI', generatedUISchema);