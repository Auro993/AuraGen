const FrictionEngine = require('../services/FrictionEngine');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('🔌 New client connected:', socket.id);

    // Join session room
    socket.on('join-session', (sessionId) => {
      socket.join(sessionId);
      console.log(`📎 Client ${socket.id} joined session: ${sessionId}`);
    });

    // Handle friction events
    socket.on('friction-event', async (data) => {
      const { sessionId, eventType, metrics } = data;
      console.log(`📊 Friction event: ${eventType}`, metrics);

      try {
        // Calculate cognitive load score
        const score = FrictionEngine.calculateScore(metrics);
        
        // Emit score to client
        io.to(sessionId).emit('friction-score', {
          score,
          timestamp: new Date()
        });

        // If high friction detected
        if (score > 70) {
          // Simulate AI generation (since we don't have OpenAI API key yet)
          setTimeout(() => {
            io.to(sessionId).emit('ui-generated', {
              component: {
                type: 'wizard',
                steps: [
                  { question: 'What is your full name?', placeholder: 'Enter your full name' },
                  { question: 'What is your email address?', placeholder: 'Enter your email' },
                  { question: 'Enter your PAN Number', placeholder: 'Enter PAN' },
                  { question: 'What is your annual income?', placeholder: 'Enter income' }
                ]
              },
              score,
              timestamp: new Date()
            });
          }, 3000);
        }
      } catch (error) {
        console.error('❌ Friction event error:', error);
        io.to(sessionId).emit('error', {
          message: 'Failed to process friction event',
          error: error.message
        });
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('🔌 Client disconnected:', socket.id);
    });
  });
};