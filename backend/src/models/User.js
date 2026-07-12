const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  plan: {
    type: String,
    enum: ['starter', 'pro', 'enterprise'],
    default: 'starter'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', function(next) {
  const user = this;
  
  if (!user.isModified('password')) {
    return next();
  }
  
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      console.log('🔐 Password hashed successfully');
      next();
    });
  });
});

// Compare password method - FIXED VERSION
userSchema.methods.comparePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return reject(err);
      console.log('🔑 Password comparison result:', isMatch);
      resolve(isMatch);
    });
  });
};

module.exports = mongoose.model('User', userSchema);