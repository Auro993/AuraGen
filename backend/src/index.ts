import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './websocket/server';

// Use require to avoid module resolution issues
const routes = require('./routes').default;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'AuraGen Backend Running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});