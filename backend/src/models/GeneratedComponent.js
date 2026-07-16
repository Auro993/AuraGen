const mongoose = require('mongoose');

const generatedComponentSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  version: {
    type: String,
    default: '1.0'
  },
  originalUI: {
    type: Object,
    default: {}
  },
  generatedUI: {
    type: Object,
    default: {}
  },
  componentName: {
    type: String,
    default: ''
  },
  code: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['generated', 'validated', 'injected', 'applied', 'failed'],
    default: 'generated'
  },
  frictionTrigger: {
    score: { type: Number, default: 0 },
    reason: { type: String, default: '' }
  },
  changes: [{
    type: String
  }],
  beforeFriction: {
    type: Number,
    default: 0
  },
  afterFriction: {
    type: Number,
    default: 0
  },
  metadata: {
    timestamp: { type: Date, default: Date.now },
    model: { type: String, default: 'Gemini' },
    generationTime: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('GeneratedComponent', generatedComponentSchema);