console.log('🚀 Starting server initialization...');

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const http = require('http');
const { Server } = require('socket.io');

console.log('✅ Dependencies loaded');

dotenv.config();
console.log('✅ Environment variables loaded');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

console.log('✅ Server and Socket.io created');

// Middleware
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(cors());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('✅ Middleware configured');

// Connect to Database
console.log('📊 Connecting to database...');
try {
  const connectDB = require('./config/database');
  connectDB();
} catch (error) {
  console.error('❌ Database connection error:', error.message);
}

// Routes
console.log('📁 Loading routes...');
try {
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/sessions', require('./routes/sessions'));
  app.use('/api/analytics', require('./routes/analytics'));
  app.use('/api/ui', require('./routes/ui'));
  console.log('✅ Routes loaded');
} catch (error) {
  console.error('❌ Route loading error:', error.message);
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date(),
    database: 'connected'
  });
});

// WebSocket handling
console.log('🔌 Setting up WebSocket...');
try {
  require('./websocket/socketHandler')(io);
  console.log('✅ WebSocket handler loaded');
} catch (error) {
  console.error('❌ WebSocket error:', error.message);
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🔌 WebSocket ready on ws://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

// Handle any uncaught errors
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});