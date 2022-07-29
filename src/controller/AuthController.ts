import { Body, Post, Route, Tags } from 'tsoa';
import { IAuthController } from './interfaces';
import { LogSuccess, LogError, LogWarning } from '../utils/logger';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuth } from '../domain/interfaces/IAuth.interface';

// ORM imports
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserByID,
} from '../domain/orm/User.orm';

@Route('/api/auth')
@Tags('AuthController')
export class AuthController implements IAuthController {
  /**
   * Endpoint that registers a new User
   * @param user user to be created
   * @returns new user created and stored in db
   */
  @Post('/register')
  public async registerUser(@Body() user: IUser): Promise<any> {
    let response: any = '';

    if (user) {
      LogSuccess(`[/api/auth/register] Register New User: ${user.email}`);
      await registerUser(user).then((r) => {
        LogSuccess(`[/api/auth/register] Created User: ${user.email}`);
        response = {
          message: `User created successfully: ${user.name}`,
        };
      });
    } else {
      LogWarning('[/api/auth/register] Register needs User Entity');
      response = {
        message:
          'User not Registered: Please, provide a User Entity to create one',
      };
    }
    return response;
  }

  @Post('/login')
  public async loginUser(@Body() auth: IAuth): Promise<any> {
    let response: any = '';

    if (auth) {
      LogSuccess(`[/api/auth/login] Login User: ${auth.email} `);
      await loginUser(auth).then((r) => {
        response = {
          message: `Welcome, ${auth.email}`,
          token: r.token, // JWT generated for logged in user
        };
      });
    } else {
      LogWarning(
        '[/api/auth/login] Login needs Auth Entity (email && password)'
      );
      response = {
        error: '[AUTH ERROR]: Email & Password are needed',
        message: 'Please, provide a email && password to login',
      };
    }

    return response;
  }

  @Post('/logout')
  logoutUser(): Promise<any> {
    // TODO: Close session of user
    throw new Error('Method not implemented.');
  }
}
