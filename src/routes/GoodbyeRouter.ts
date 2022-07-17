import express, { Request, Response } from 'express';
import { GoodbyeController } from '../controller/GoodbyeController';
import { LogInfo } from '../utils/logger';

// Router from express
const goodbyeRouter = express.Router();

// http://localhost:8000/api/hello/
goodbyeRouter
  .route('/')
  // GET:
  .get(async (req: Request, res: Response) => {
    // Obtain a Query Param
    const name: any = req?.query?.name;
    LogInfo(`Query Param: ${name}`);
    // Controller Instance method to execute
    const controller: GoodbyeController = new GoodbyeController();
    // Obtain Response
    const response = await controller.getMessage(name);
    // Send response to client
    return res.send(response);
  });

// Export Goodbye Router
export default goodbyeRouter;
