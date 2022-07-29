import { Body, Get, Post, Query, Route, Tags } from 'tsoa';
import { IAuthController } from './interfaces';
import { LogSuccess, LogError, LogWarning } from '../utils/logger';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuth } from '../domain/interfaces/IAuth.interface';

// ORM imports
import {
  registerUser,
  loginUser,
  getUserByID,
} from '../domain/orm/User.orm';
import { AuthResponse, ErrorResponse } from './types';

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
    let response: AuthResponse | ErrorResponse | undefined;

    if (auth) {
      const data = await loginUser(auth);
      data.error
        ? LogError(`[/api/auth/login] Not valid Login User Data`)
        : LogSuccess(`[/api/auth/login] Login User: ${auth.email} `);

      response = data;
    } else {
      LogWarning(
        '[/api/auth/login] Login needs Auth Entity (email && password)'
      );
      response = {
        error: '[AUTH ERROR]: Email & Password are needed',
        message: 'Please, provide an email && password to login',
      };
    }

    return response;
  }

  /**
   * Endpoint that retrieves a single User from the "Users" Collection in DB
   * Middleware: Validate JWT
   * In order to work: you should add the x-access-token with a valid JWT in headers
   * @param {string} id Id of user to retrieve
   * @returns User found by ID
   */
  @Get('/me')
  public async userData(@Query() id: string): Promise<any> {
    let response: any = '';

    if (id) {
      LogSuccess(`[/api/auth/me] Get User Data By ID: ${id} `);
      response = await getUserByID(id);
    }

    return response;
  }

  @Post('/logout')
  logoutUser(): Promise<any> {
    // TODO: Close session of user
    throw new Error('Method not implemented.');
  }
}
