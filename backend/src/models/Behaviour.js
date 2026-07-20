const mongoose = require('mongoose');

const behaviourSchema = new mongoose.Schema({
  sessionId: {
    type: String,  // Changed to String for demo IDs
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  mouseDistance: {
    type: Number,
    default: 0
  },
  clicks: {
    type: Number,
    default: 0
  },
  wrongClicks: {
    type: Number,
    default: 0
  },
  idleTime: {
    type: Number,
    default: 0
  },
  scrollDepth: {
    type: Number,
    default: 0
  },
  formErrors: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 0
  },
  formData: {
    type: Object,
    default: {}
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Behaviour', behaviourSchema);