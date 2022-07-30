import { Body, Delete, Get, Put, Query, Route, Tags } from 'tsoa';
import { IUserController } from './interfaces';
import { LogSuccess, LogWarning } from '../utils/logger';

// ORM - Users Collection
import {
  getAllUsers,
  getUserByID,
  deleteUserByID,
  updateUserByID,
} from '../domain/orm/User.orm';

@Route('/api/users')
@Tags('UserController')
export class UserController implements IUserController {
  /**
   *  Endpoint that retrieves a list of Users from "Users" collection in DB
   * @param {string} id Id of user to retrieve (optional)
   * @returns All users or user found by ID
   */
  @Get('/')
  public async getUsers(
    @Query() page: number,
    @Query() limit: number,
    @Query() id?: string
  ): Promise<any> {
    let response: any = '';

    if (id) {
      LogSuccess(`[/api/users] Get User By ID: ${id}`);
      response = await getUserByID(id);
    } else {
      LogSuccess('[/api/users] Get All Users Request');
      response = await getAllUsers(page, limit);
    }
    return response;
  }

  /**
   * Endpoint that deletes a User by ID from "Users" collection in DB
   * @param {string} id Id of user to delete (optional)
   * @returns message informing if user was deleted successfully
   */
  @Delete('/')
  public async deleteUser(@Query() id?: string): Promise<any> {
    let response: any = '';

    if (id) {
      LogSuccess(`[/api/users] Get User By ID: ${id}`);
      await deleteUserByID(id).then((r) => {
        response = {
          message: `User with ID ${id} deleted successfully`,
        };
      });
    } else {
      LogWarning('[/api/users] Delete User Request without ID');
      response = {
        message: 'Please provide a valid ID',
      };
    }
    return response;
  }

  @Put('/')
  public async updateUser(
    @Query() id: string,
    @Body() user: any
  ): Promise<any> {
    let response: any = '';

    if (id) {
      LogSuccess(`[/api/users] Update User By ID: ${id}`);
      await updateUserByID(id, user).then((r) => {
        response = {
          status: 204,
          message: `User with ID ${id} updated successfully`,
        };
      });
    } else {
      LogWarning('[/api/users] Update User Request without ID');
      response = {
        status: 400,
        message: 'Please provide a valid ID to update an existing user',
      };
    }
    return response;
  }
}
