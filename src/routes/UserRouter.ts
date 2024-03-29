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

    // Pagination
    const page: number = Number(req?.query?.page) || 1;
    const limit: number = Number(req?.query?.limit) || 10;

    // Controller Instance method to execute
    const controller: UserController = new UserController();
    // Obtain Response
    const response: any = await controller.getUsers(page, limit, id);
    // Send response to client
    return res.status(200).send(response);
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
    return res.status(200).send(response);
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
    return res.status(200).send(response);
  });

userRouter.route('/katas').get(async (req: Request, res: Response) => {
  // Obtain a Query Param (ID)
  const id: any = req?.query?.id;

  // Pagination
  const page: any = req?.query?.page || 1;
  const limit: any = req?.query?.limit || 10;

  // Controller Instance to excute method
  const controller: UserController = new UserController();
  // Obtain Reponse
  const response: any = await controller.getKatas(page, limit, id);
  // Send to the client the response
  return res.status(200).send(response);
});

// Export User Router
export default userRouter;

/**
 * Get Documents => 200 OK
 * Creation Documents => 201 OK
 * Deletion of Documents => 200 (Entity) / 204 (No return)
 * Update of Documnets => 200 (Entity) / 204 (No return)
 */
