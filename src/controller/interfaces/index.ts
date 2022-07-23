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

export interface IKataController {
  // List all Katas from database || get a single Kata By ID
  getKatas(id?: string, level?: string, sort?: string): Promise<any>;
  // Delete Kata By ID
  deleteKata(id?: string): Promise<any>;
  // Create new Kata
  createKata(kata: any): Promise<any>;
  // Update Kata
  updateKata(id: string, kata: any): Promise<any>;
  // Rate Kata
  rateKata(id: string, userValoration: number): Promise<any>;
}
