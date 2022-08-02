import { Body, Delete, Get, Patch, Path, Post, Put, Query, Route, Tags } from 'tsoa';
import { IKataController } from './interfaces';
import { LogSuccess, LogWarning } from '../utils/logger';

// ORM - Katas Collection
import {
  getAllKatas,
  getKataByID,
  updateKataByID,
  deleteKataByID,
  createKata,
  getKatasByLevel,
  getBestKatas,
  rateKata,
  solveKata,
} from '../domain/orm/Kata.orm';
import { IKata } from '../domain/interfaces/IKata.interface';

@Route('/api/katas')
@Tags('KatasController')
export class KataController implements IKataController {
  /**
   * Endpoint that retrieves katas from "Katas" Collection in DB
   * @param {number} page page number for displaying a list of katas from DB
   * @param {number} limit limits to a number the list of katas retrieved from DB
   * @param {string} id Id of Kata to retrieve (optional)
   * @param {string} level level of a Katas with options: Basic, Medium and High
   * @param {string} sort sorts katas by stars given in descending order (default).
   * @returns All katas o kata found by ID
   */
  @Get('/')
  public async getKatas(
    @Query() page: number,
    @Query() limit: number,
    @Query() id?: string,
    @Query() level?: string,
    @Query() sort?: string
  ): Promise<any> {
    let response: any = '';

    if (id) {
      LogSuccess(`[/api/katas] Get Kata By ID: ${id} `);
      response = await getKataByID(id);
    } else if (level) {
      LogSuccess(`[/api/katas] Get Katas By Level: ${level}`);
      response = await getKatasByLevel(level, page, limit);
    } else if (sort && sort === 'stars') {
      LogSuccess(`[/api/katas] Get best rated Katas.`);
      response = await getBestKatas(page, limit);
    } else {
      LogSuccess('[/api/katas] Get All Katas Request');
      response = await getAllKatas(page, limit);
    }

    return response;
  }

  /**
   * @param {Object} kata data to create a kata
   * @returns message informing if kata was created
   */

  @Post('/')
  public async createKata(@Body() kata: IKata): Promise<any> {
    let response: any = '';

    if (kata) {
      LogSuccess(`[/api/katas] Create New Kata: ${kata.name} `);
      await createKata(kata).then((r) => {
        LogSuccess(`[/api/katas] Created Kata: ${kata.name} `);
        response = {
          message: `Kata created successfully: ${kata.name}`,
        };
      });
    } else {
      LogWarning('[/api/katas] Register needs Kata Entity');
      response = {
        message: 'Kata not Registered: Please, provide a Kata Entity to create one',
      };
    }
    return response;
  }

  /**
   * Endpoint to delete the Katas in the Collection "Katas" of DB
   * @param {string} id Id of Kata to delete (optional)
   * @returns message informing if deletion was correct
   */
  @Delete('/')
  public async deleteKata(@Query() id?: string): Promise<any> {
    let response: any = '';

    if (id) {
      response = await deleteKataByID(id);

      if (response) {
        LogSuccess(`[/api/katas] Delete Kata By ID: ${id} `);
        response = {
          message: `Kata with id ${id} deleted successfully`,
        };
      } else {
        LogWarning('[/api/katas] Delete Kata Request User is not the creator');
        response = {
          status: 403,
          message: 'You do not have the rights to perform this action',
        };
      }
    } else {
      LogWarning('[/api/katas] Delete Kata Request WITHOUT ID');
      response = {
        message: 'Please, provide an ID to remove from database',
      };
    }

    return response;
  }

  /**
   * @param {string} id Id of Kata to update
   * @param {Object} kata kata object to update
   * @returns message informing if kata was updated successfully
   */

  @Put('/')
  public async updateKata(@Query() id: string, @Body() kata: IKata): Promise<any> {
    let response: any = '';

    if (id) {
      response = await updateKataByID(id, kata);

      if (response) {
        LogSuccess(`[/api/katas] Update Kata By ID: ${id} `);
        response = {
          message: `Kata with id ${id} updated successfully`,
        };
      } else {
        LogWarning('[/api/katas] Update Kata Request User is not the creator');
        response = {
          status: 403,
          message: 'You do not have the rights to perform this action',
        };
      }
    } else {
      LogWarning('[/api/katas] Update Kata Request WITHOUT ID');
      response = {
        message: 'Please, provide an ID to update an existing kata',
      };
    }

    return response;
  }

  /**
   * Endpoint that rates a single Kata by passing an ID
   * @param {string} id Id of kata to rate
   * @param {number} userValoration number to rate a kata
   * @returns message informing if kata was rated successfully
   */
  @Patch('/{id}')
  public async rateKata(@Path() id: string, @Body() userValoration: number): Promise<any> {
    let response: any = '';

    if (id) {
      LogSuccess(`[/api/katas/${id}] Update Kata valoration: ${userValoration}`);
      await rateKata(id, userValoration).then((r) => {
        response = {
          message: `Kata with ID ${id} rated successfully`,
        };
      });
    } else {
      LogWarning(`[/api/katas/${id}] Update Kata Request without ID`);
      response = {
        message: 'Please provide a valid ID to update an existing kata',
      };
    }
    return response;
  }

  /**
   * @param {string} id Id of kata to solve
   * @param {string} userSolution solution given by user
   * @returns kata solution to user.
   */
  @Post('/{id}')
  public async solveKata(@Path() id: string, @Body() userSolution: string): Promise<any> {
    let response: any = '';
    LogSuccess(`[/api/katas/${id}] Sending solution successfully`);
    const result = await solveKata(id);
    if (result) {
      response = {
        solution: result,
      };
    }
    response = {
      status: 400,
      message: 'Please provide a valid ID and/or solution to solve the kata',
    };

    return response;
  }
}
