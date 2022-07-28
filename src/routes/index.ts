/**
 * Root Router
 * Redirections to Routes
 */

import express, { Request, Response } from 'express';
import helloRouter from './HelloRouter';
import userRouter from './UserRouter';
import authRouter from './AuthRouter';
import { LogInfo } from '../utils/logger';

// Server instance
const server = express();

// Router instance
const rootRouter = express.Router();

// Handles requests to http://localhost:8000/api

// GET: http://localhost:8000/api/
rootRouter.get('/', (req: Request, res: Response) => {
  LogInfo('GET: http://localhost:8000/api/');
  res.send(
    'Welcome to API RESTful Express + TS + Nodemon + Jest + Swagger + Mongoose'
  );
});

// Redirections to Routers & Controllers
server.use('/', rootRouter); // http://localhost:8000/api/
server.use('/hello', helloRouter); // http://localhost:8000/api/hello --> HelloRouter
server.use('/users', userRouter); // http://localhost:8000/api/users --> userRouter
// Auth routes
server.use('/auth', authRouter); // http://localhost:8000/api/auth --> AuthRouter

// Add more routes to the app

export default server;
