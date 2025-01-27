import cors from 'cors';
import pino from 'pino-http';

const setupMiddleware = (app) => {
  app.use(cors());
  app.use(pino());
};

export default setupMiddleware;
