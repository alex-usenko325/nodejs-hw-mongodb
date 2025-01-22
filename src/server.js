import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

dotenv.config();

const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(pino());

  app.get('/', (req, res) => {
    res.send('Welcome to the server!');
  });

  app.get('/contacts', (req, res) => {
    res.json({ message: 'Contact page' });
  });

  app.use((_, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
