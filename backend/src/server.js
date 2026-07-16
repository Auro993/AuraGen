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

// Load environment variables
dotenv.config();
console.log('✅ Environment variables loaded');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

console.log('✅ Server and Socket.io created');

// ============ MIDDLEWARE ============
console.log('📦 Configuring middleware...');

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(compression());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

console.log('✅ Middleware configured');

// ============ DATABASE CONNECTION ============
console.log('📊 Connecting to database...');
const connectDB = require('./config/database');
connectDB();

// ============ ROUTES ============
console.log('📁 Loading routes...');

// Health check route (before authentication)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: mongoose?.connection?.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Public routes
app.use('/api/auth', require('./routes/auth'));

// Protected routes (require authentication)
const auth = require('./middleware/auth');

// Dashboard routes
try {
  const dashboardRoutes = require('./routes/dashboard');
  app.use('/api/dashboard', dashboardRoutes);
  console.log('✅ Dashboard routes loaded');
} catch (error) {
  console.error('❌ Dashboard routes error:', error.message);
}

// Session routes
try {
  app.use('/api/sessions', require('./routes/sessions'));
  console.log('✅ Session routes loaded');
} catch (error) {
  console.error('❌ Session routes error:', error.message);
}

// Analytics routes
try {
  app.use('/api/analytics', require('./routes/analytics'));
  console.log('✅ Analytics routes loaded');
} catch (error) {
  console.error('❌ Analytics routes error:', error.message);
}

// UI routes
try {
  app.use('/api/ui', require('./routes/ui'));
  console.log('✅ UI routes loaded');
} catch (error) {
  console.error('❌ UI routes error:', error.message);
}

console.log('✅ All routes loaded');

// ============ WEBSOCKET ============
console.log('🔌 Setting up WebSocket...');
try {
  require('./websocket/socketHandler')(io);
  console.log('✅ WebSocket handler loaded');
} catch (error) {
  console.error('❌ WebSocket error:', error.message);
}

// ============ ERROR HANDLING ============
// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    path: req.originalUrl 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  console.error('Stack:', err.stack);
  
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(status).json({
    message: message,
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      path: req.path 
    })
  });
});

// ============ START SERVER ============
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`🔌 WebSocket ready on ws://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`\n✅ Server is ready to accept requests\n`);
});

// ============ PROCESS HANDLERS ============
// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  console.error('Stack:', error.stack);
  // Graceful shutdown
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise);
  console.error('Reason:', reason);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Received SIGTERM signal. Closing server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 Received SIGINT signal. Closing server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

// Add mongoose reference for health check
const mongoose = require('mongoose');