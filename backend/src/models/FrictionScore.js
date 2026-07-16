const mongoose = require('mongoose');

const frictionScoreSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
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
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  factors: {
    mouseSpeed: { type: Number, default: 0 },
    hesitationTime: { type: Number, default: 0 },
    errorRate: { type: Number, default: 0 },
    rageClicks: { type: Number, default: 0 },
    idleTime: { type: Number, default: 0 },
    wrongClicks: { type: Number, default: 0 }
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
frictionScoreSchema.index({ sessionId: 1, timestamp: -1 });
frictionScoreSchema.index({ userId: 1, timestamp: -1 });

module.exports = mongoose.model('FrictionScore', frictionScoreSchema);