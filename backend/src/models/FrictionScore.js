const mongoose = require('mongoose');

const frictionScoreSchema = new mongoose.Schema({
  sessionId: {
    type: String,  // Changed from ObjectId to String to accept demo IDs
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  level: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical', 'Low', 'Medium', 'High', 'Critical'], // Added capitalized versions
    default: 'medium'
  },
  factors: {
    type: Array,
    default: []
  },
  reason: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('FrictionScore', frictionScoreSchema);