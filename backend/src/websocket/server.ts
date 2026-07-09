import { WebSocketServer, WebSocket } from 'ws';
import { CodeGenAgent } from '../agents/CodeGenAgent';
import { FrictionAnalyzer } from '../agents/FrictionAnalyzer';

const wss = new WebSocketServer({ port: 3002 });
const codeGen = new CodeGenAgent();
const frictionAnalyzer = new FrictionAnalyzer();

console.log('🔌 WebSocket server running on port 3002');

const clients = new Map<string, WebSocket>();

wss.on('connection', (ws: WebSocket) => {
  const clientId = `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  clients.set(clientId, ws);
  console.log(`👤 Client connected: ${clientId}`);

  ws.send(JSON.stringify({
    type: 'welcome',
    message: 'Connected to AuraGen WebSocket Server',
    clientId: clientId
  }));

  ws.on('message', async (message: string) => {
    try {
      const data = JSON.parse(message);
      
      if (data.type === 'friction_data') {
        const { velocity, clicks, timestamp } = data.payload;
        const loadScore = frictionAnalyzer.calculateScore(velocity, clicks);
        
        console.log(`📊 Score: ${loadScore.toFixed(2)}`);

        if (loadScore > 0.1) {
          console.log('😤 Generating simpler UI...');
          const newComponent = await codeGen.generateUI({ velocity, clicks, timestamp, loadScore });
          
          ws.send(JSON.stringify({
            type: 'ui_update',
            component: newComponent,
            score: loadScore,
            timestamp: new Date().toISOString()
          }));
        }
      }
    } catch (error) {
      console.error('❌ Error:', error);
    }
  });

  ws.on('close', () => {
    clients.delete(clientId);
    console.log(`👋 Client disconnected: ${clientId}`);
  });
});