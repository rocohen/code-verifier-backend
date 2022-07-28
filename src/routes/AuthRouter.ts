import express, { Request, Response } from 'express';
import { AuthController } from '../controller/AuthController';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuth } from '../domain/interfaces/IAuth.interface';

// BCRYPT for passwords
import bcrypt from 'bcrypt';

// Router from express
const authRouter = express.Router();

authRouter.route('/register').post(async (req: Request, res: Response) => {
  const { name, email, password, age } = req.body;
  let hashedPassword = '';

  if (name && email && password && age) {
    // Get password from request and cypher it
    hashedPassword = bcrypt.hashSync(password, 8);

    const newUser: IUser = {
      name,
      email,
      password: hashedPassword,
      age,
    };

    // Controller Instance method to execute
    const controller: AuthController = new AuthController();

    // Obtain Response
    const response: any = await controller.registerUser(newUser);

    // Send response to client
    return res.status(200).send(response);
  }
});

authRouter.route('/login').post(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email && password) {
    // Controller Instance method to execute
    const controller: AuthController = new AuthController();

    // TODO: IAuth
    const auth: IAuth = {
      email,
      password,
    };

    // Obtain Response
    const response: any = await controller.loginUser(auth);

    // Sends response to client with JWT included to authorize requests
    return res.status(200).send(response);
  }
});

// Export Auth Router
export default authRouter;
