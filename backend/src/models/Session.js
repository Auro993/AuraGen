const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  duration: {
    type: Number,
    default: 0
  },
  frictionScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  metrics: {
    mouseMovements: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    errors: { type: Number, default: 0 },
    hesitationTime: { type: Number, default: 0 },
    rageClicks: { type: Number, default: 0 },
    mouseDistance: { type: Number, default: 0 },
    idleTime: { type: Number, default: 0 },
    wrongClicks: { type: Number, default: 0 }
  },
  visitedPages: [{
    page: { type: String },
    time: { type: Date, default: Date.now },
    duration: { type: Number, default: 0 }
  }],
  generatedComponents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GeneratedComponent'
  }],
  status: {
    type: String,
    enum: ['active', 'completed', 'abandoned', 'in-progress'],
    default: 'active'
  },
  device: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet'],
    default: 'desktop'
  },
  browser: {
    type: String,
    default: 'Unknown'
  },
  ipAddress: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Session', sessionSchema);