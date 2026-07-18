const FrictionEngine = require('../services/FrictionEngine');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('🔌 New client connected:', socket.id);

    // Send welcome message to client
    socket.emit('welcome', {
      message: 'Connected to AuraGen WebSocket',
      timestamp: new Date().toISOString(),
      socketId: socket.id
    });

    // Set up interval for periodic friction updates (for demo purposes)
    let frictionInterval = null;

    // Start sending periodic friction updates
    socket.on('start-friction-updates', (sessionId) => {
      console.log(`📊 Starting friction updates for session: ${sessionId}`);
      
      if (frictionInterval) {
        clearInterval(frictionInterval);
      }

      // Send a friction update every 5 seconds
      frictionInterval = setInterval(() => {
        const score = Math.floor(Math.random() * 40) + 30; // Random score between 30-70
        socket.emit('frictionUpdate', {
          score: score,
          timestamp: new Date().toISOString(),
          sessionId: sessionId
        });
      }, 5000);
    });

    // Stop friction updates
    socket.on('stop-friction-updates', () => {
      console.log('🛑 Stopping friction updates');
      if (frictionInterval) {
        clearInterval(frictionInterval);
        frictionInterval = null;
      }
    });

    // Join session room
    socket.on('join-session', (sessionId) => {
      socket.join(sessionId);
      console.log(`📎 Client ${socket.id} joined session: ${sessionId}`);
      
      // Send confirmation
      socket.emit('session-joined', {
        sessionId: sessionId,
        timestamp: new Date().toISOString()
      });
    });

    // Leave session room
    socket.on('leave-session', (sessionId) => {
      socket.leave(sessionId);
      console.log(`📎 Client ${socket.id} left session: ${sessionId}`);
    });

    // Handle friction events
    socket.on('friction-event', async (data) => {
      const { sessionId, eventType, metrics } = data;
      console.log(`📊 Friction event: ${eventType}`, metrics);

      try {
        // Calculate cognitive load score
        const score = FrictionEngine.calculateScore(metrics);
        console.log(`📊 Calculated friction score: ${score}`);
        
        // Emit score to client
        io.to(sessionId).emit('friction-score', {
          score: score,
          level: score > 70 ? 'high' : score > 40 ? 'medium' : 'low',
          timestamp: new Date().toISOString()
        });

        // Also emit to the specific socket for immediate feedback
        socket.emit('friction-update', {
          score: score,
          level: score > 70 ? 'high' : score > 40 ? 'medium' : 'low',
          timestamp: new Date().toISOString()
        });

        // If high friction detected
        if (score > 70) {
          // Simulate AI generation
          setTimeout(() => {
            const generatedUI = {
              type: 'wizard',
              steps: [
                { 
                  question: 'What is your full name?', 
                  placeholder: 'Enter your full name',
                  field: 'name'
                },
                { 
                  question: 'What is your email address?', 
                  placeholder: 'Enter your email',
                  field: 'email'
                },
                { 
                  question: 'Enter your PAN Number', 
                  placeholder: 'Enter PAN',
                  field: 'pan'
                },
                { 
                  question: 'What is your annual income?', 
                  placeholder: 'Enter income',
                  field: 'income'
                }
              ],
              generatedAt: new Date().toISOString(),
              frictionScore: score
            };

            io.to(sessionId).emit('ui-generated', {
              component: generatedUI,
              score: score,
              timestamp: new Date().toISOString()
            });

            console.log(`✅ UI generated for session ${sessionId} with score ${score}`);
          }, 3000);
        }
      } catch (error) {
        console.error('❌ Friction event error:', error);
        io.to(sessionId).emit('error', {
          message: 'Failed to process friction event',
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    });

    // Handle ping for connection health check
    socket.on('ping', () => {
      socket.emit('pong', {
        timestamp: new Date().toISOString()
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('🔌 Client disconnected:', socket.id);
      
      // Clean up interval
      if (frictionInterval) {
        clearInterval(frictionInterval);
        frictionInterval = null;
      }
    });

    // Handle errors
    socket.on('error', (error) => {
      console.error('❌ Socket error:', error);
    });
  });
};