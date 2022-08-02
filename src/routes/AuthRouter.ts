import express, { Request, Response } from 'express';
import { AuthController } from '../controller/AuthController';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuth } from '../domain/interfaces/IAuth.interface';

// BCRYPT for passwords
import bcrypt from 'bcrypt';

// JWT Verifier MiddleWare
import { verifyToken } from '../middlewares/verifyToken.middleware';

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
      katas: [],
    };

    // Controller Instance method to execute
    const controller: AuthController = new AuthController();

    // Obtain Response
    const response: any = await controller.registerUser(newUser);

    // Send response to client
    return res.status(200).send(response);
  } else {
    // Send to the client the response
    return res.status(400).send({
      message: '[ERROR User Data missing]: No user was registered.',
    });
  }
});

authRouter.route('/login').post(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email && password) {
    // Controller Instance method to execute
    const controller: AuthController = new AuthController();

    const auth: IAuth = {
      email,
      password,
    };

    // Obtain Response
    const response: any = await controller.loginUser(auth);

    // Sends response to client with JWT included to authorize requests
    return res.status(200).send(response);
  } else {
    // Send to the client the response
    return res.status(400).send({
      message: '[ERROR User Data missing or wrong]: ¨Please try again.',
    });
  }
});

authRouter
  .route('/me')
  .get(verifyToken, async (req: Request, res: Response) => {
    // Get the ID of user to check it's data
    const id: any = req?.query?.id;

    if (id) {
      // Controller: Auth Controller
      const controller: AuthController = new AuthController();

      // Obtain response from Controller
      const response: any = await controller.userData(id);

      // If user is authorized:
      return res.status(200).send(response);
    } else {
      return res.status(401).send({
        message: 'You are not authorized to perform this action',
      });
    }
  });

// Export Auth Router
export default authRouter;
