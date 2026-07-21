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
  frictionScore: {
    type: Number,
    required: true
  },
  page: {
    type: String,
    default: 'Tax Form'
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
  estimatedReduction: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['generated', 'applied', 'rejected'],
    default: 'generated'
  },
  prompt: {
    type: String,
    default: ''
  },
  geminiResponse: {
    type: Object,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('GeneratedUI', generatedUISchema);