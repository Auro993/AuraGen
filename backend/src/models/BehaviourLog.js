const mongoose = require('mongoose');

const behaviourLogSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  eventType: {
    type: String,
    enum: ['mouse_move', 'click', 'rage_click', 'scroll', 'idle', 'hover', 'form_error', 'page_change', 'session_start', 'session_end'],
    required: true
  },
  data: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    scrollDepth: { type: Number, default: 0 },
    element: { type: String, default: '' },
    error: { type: String, default: '' },
    duration: { type: Number, default: 0 },
    page: { type: String, default: '' }
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
behaviourLogSchema.index({ sessionId: 1, timestamp: -1 });
behaviourLogSchema.index({ userId: 1, timestamp: -1 });

module.exports = mongoose.model('BehaviourLog', behaviourLogSchema);