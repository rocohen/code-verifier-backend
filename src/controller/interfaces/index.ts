import { IUser } from '../../domain/interfaces/IUser.interface';
import { BasicResponse } from '../types';

export interface IHelloController {
  getMessage(name?: string): Promise<BasicResponse>;
}

export interface IUserController {
  // Read all users from databse || get User By ID
  getUsers(id?: string): Promise<any>;
  // Delete User By ID
  deleteUser(id?: string): Promise<any>;
  // Create new User
  createUser(user: any): Promise<any>;
  // Update User
  updateUser(id: string, user: any): Promise<any>;
}

export interface IAuthController {
  // register users
  registerUser(user: IUser): Promise<any>;
  // login user
  loginUser(auth: any): Promise<any>;
}
