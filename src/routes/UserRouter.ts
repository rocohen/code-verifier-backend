import express, { Request, Response } from 'express';
import { UserController } from '../controller/UserController';
import { LogInfo } from '../utils/logger';

// Router from express
const userRouter = express.Router();

// http://localhost:8000/api/users/
userRouter
  .route('/')
  // GET:
  .get(async (req: Request, res: Response) => {
    // Obtain a Query Param
    const id: any = req?.query?.id;
    LogInfo(`Query Param: ${id}`);
    // Controller Instance method to execute
    const controller: UserController = new UserController();
    // Obtain Response
    const response: any = await controller.getUsers(id);
    // Send response to client
    return res.send(response);
  })
  // DELETE
  .delete(async (req: Request, res: Response) => {
    // Obtain a Query Param
    const id: any = req?.query?.id;
    LogInfo(`Query Param: ${id}`);
    // Controller Instance method to execute
    const controller: UserController = new UserController();
    // Obtain Response
    const response: any = await controller.deleteUser(id);
    // Send response to client
    return res.send(response);
  })
  // POST
  .post(async (req: Request, res: Response) => {
    const name = req?.body?.name || 'default name';
    const email = req?.body?.email || 'default email';
    const age = req?.body?.age || 25;

    const user = {
      name,
      email,
      age,
    };
    // Controller Instance method to execute
    const controller: UserController = new UserController();
    // Obtain Response
    const response: any = await controller.createUser(user);
    // Send response to client
    return res.send(response);
  })
  // UPDATE
  .put(async (req: Request, res: Response) => {
    // Obtain a Query Param
    const id: any = req?.query?.id;
    LogInfo(`Query Param: ${id}`);

    const name = req?.body?.name;
    const email = req?.body?.email;
    const age = req?.body?.age;
    LogInfo(`Query Body: ${name}, ${email}, ${age}`);

    const user = {
      name,
      email,
      age,
    };
    // Controller Instance method to execute
    const controller: UserController = new UserController();
    // Obtain Response
    const response: any = await controller.updateUser(id, user);
    // Send response to client
    return res.send(response);
  });
// Export Hello Router
export default userRouter;
