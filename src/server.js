import dotenv from 'dotenv';
import express from 'express';
import initMongoConnection from './db/initMongoConnection.js';
import contactsRouter from './routes/contacts.js';
import setupMiddleware from './middlewares/setupMiddleware.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const setupServer = async () => {
  const app = express();

  await initMongoConnection();

  setupMiddleware(app);

  app.use('/contacts', contactsRouter);

  app.get('/', (_, res) => {
    res.send('Welcome to the server!');
  });

  app.use(notFoundHandler);

  app.use(errorHandler);

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
