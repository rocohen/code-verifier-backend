import { Body, Delete, Get, Path, Post, Put, Query, Route, Tags } from 'tsoa';
import { IKataController } from './interfaces';
import { LogSuccess, LogWarning } from '../utils/logger';

// ORM - Kata Collection
import {
  getAllKatas,
  getKataByID,
  deleteKataByID,
  createKata,
  updateKataByID,
  getKataByLevel,
  getLatestKatas,
  getBestKatas,
  getKatasByChances,
  rateKata,
} from '../domain/orm/Kata.orm';
import { IKata } from '../domain/interfaces/Ikata.interface';

@Route('/api/katas')
@Tags('KataController')
export class KataController implements IKataController {
  /**
   *  Endpoint that retrieves a list of Katas from "Katas" collection in DB
   * @param {string} id Id of kata to retrieve (optional)
   * @param {string} level level of katas to retrieve (optional)
   * @returns All katas or kata found by ID or Katas by level
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
      LogSuccess(`[/api/katas] Get Kata By ID: ${id}`);
      response = await getKataByID(id);
    } else if (level) {
      LogSuccess(`[/api/katas] Get Kata By Level: ${level}`);
      response = await getKataByLevel(level);
    } else if (sort && sort === 'latest') {
      LogSuccess(`[/api/katas] Get latest Katas`);
      response = await getLatestKatas();
    } else if (sort && sort === 'valoration') {
      LogSuccess(`[/api/katas] Get best rated Katas.`);
      response = await getBestKatas();
    } else if (sort && sort === 'chances') {
      LogSuccess(`[/api/katas] Get Katas sorted by chances.`);
      response = await getKatasByChances();
    } else {
      LogSuccess('[/api/katas] Get All Katas Request');
      response = await getAllKatas(page, limit);
    }
    return response;
  }

  /**
   * Endpoint that deletes a Kata by ID from "Katas" collection in DB
   * @param {string} id Id of a kata to delete (optional)
   * @returns message informing if kata was deleted successfully
   */
  @Delete('/')
  public async deleteKata(@Query() id?: string): Promise<any> {
    let response: any = '';

    if (id) {
      LogSuccess(`[/api/katas] Get Kata By ID: ${id}`);
      await deleteKataByID(id).then((r) => {
        response = {
          message: `Kata with ID ${id} deleted successfully`,
        };
      });
    } else {
      LogWarning('[/api/katas] Delete Kata Request without ID');
      response = {
        message: 'Please provide a valid ID',
      };
    }
    return response;
  }

  /**
   * Endpoint to create a new Kata
   * @param {any} kata data to create a new Kata
   * @returns message informing if kata was created successfully
   */
  @Post('/')
  public async createKata(@Body() kata: IKata): Promise<any> {
    let response: any = '';
    LogSuccess(`[/api/katas] Create User ${kata}`);
    await createKata(kata).then((r) => {
      response = {
        message: `kata created successfully: ${kata.name}`,
      };
    });
    return response;
  }

  /**
   * Endpoint that updates a Kata by ID from "Katas" collection in DB
   * @param {string} id Id of kata to update
   * @param {any} kata kata data to update
   * @returns message informing if kata was updated successfully
   */
  @Put('/')
  public async updateKata(
    @Query() id: string,
    @Body() kata: any
  ): Promise<any> {
    let response: any = '';

    if (id && kata) {
      LogSuccess(`[/api/katas] Update Kata By ID: ${id}`);
      await updateKataByID(id, kata).then((r) => {
        response = {
          message: `Kata with ID ${id} updated successfully`,
        };
      });
    } else {
      LogWarning('[/api/katas] Update Kata Request without ID');
      response = {
        message: 'Please provide a valid ID to update an existing kata',
      };
    }
    return response;
  }

  /**
   * Endpoint that rates a Kata by passing an ID from "Katas" collection in DB
   * @param {string} id Id of kata to rate
   * @param {number} userValoration number to rate a kata
   * @returns message informing if kata was rated successfully
   */
  @Put('/{id}')
  public async rateKata(
    @Path() id: string,
    @Body() userValoration: number
  ): Promise<any> {
    let response: any = '';

    if (id) {
      LogSuccess(`[/api/katas] Update Kata valoration: ${userValoration}`);
      await rateKata(id, userValoration).then((r) => {
        response = {
          message: `Kata with ID ${id} rated successfully`,
        };
      });
    } else {
      LogWarning('[/api/katas] Update Kata Request without ID');
      response = {
        message: 'Please provide a valid ID to update an existing kata',
      };
    }
    return response;
  }
}
