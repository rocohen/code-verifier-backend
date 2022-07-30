import express, { Request, Response } from 'express';
import { KataController } from '../controller/KataController';
import { LogInfo } from '../utils/logger';

import { KataLevel, IKata } from '../domain/interfaces/IKata.interface';

// Router from express
const kataRouter = express.Router();

// http://localhost:8000/api/users?id=6253dc47f30baed4c6de7f99
kataRouter
  .route('/')
  // GET:
  .get(async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    const id: any = req?.query?.id;

    // Pagination
    const page: number = Number(req?.query?.page) || 1;
    const limit: number = Number(req?.query?.limit) || 10;

    LogInfo(`Query Param: ${id}`);
    // Controller Instance to excute method
    const controller: KataController = new KataController();
    // Obtain Reponse
    const response: any = await controller.getKatas(page, limit, id);
    // Send to the client the response
    return res.status(200).send(response);
  })
  // DELETE:
  .delete(async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    const id: any = req?.query?.id;
    LogInfo(`Query Param: ${id}`);
    // Controller Instance to excute method
    const controller: KataController = new KataController();
    // Obtain Reponse
    const response: any = await controller.deleteKata(id);
    // Send to the client the response
    return res.status(200).send(response);
  })
  .put(async (req: Request, res: Response) => {
    // Obtain a Query Param (ID)
    const id: any = req?.query?.id;

    // Read from body
    const name: string = req?.body?.name;
    const description: string = req?.body?.description || '';
    const level: KataLevel = req?.body?.level || KataLevel.BASIC;
    const intents: number = req?.body?.intents || 0;
    const stars: number = req?.body?.starts || 0;
    const creator: string = req?.body?.creator;
    const solution: string = req?.body?.solution || '';
    const participants: string[] = req?.body?.participants || [];

    if (
      name &&
      description &&
      level &&
      intents >= 0 &&
      stars >= 0 &&
      creator &&
      solution &&
      participants.length >= 0
    ) {
      // Controller Instance to excute method
      const controller: KataController = new KataController();

      const kata: IKata = {
        name,
        description,
        level,
        intents,
        stars,
        creator,
        solution,
        participants,
      };

      // Get Response
      const response: any = await controller.updateKata(id, kata);

      // Send to the client the response
      return res.status(200).send(response);
    } else {
      return res.status(400).send({
        message:
          '[ERROR] Updating Kata. You need to send all attributes of Kata to update it',
      });
    }
  })
  .post(async (req: Request, res: Response) => {
    // Read from body
    const name: string = req?.body?.name;
    const description: string = req?.body?.description || 'Default description';
    const level: KataLevel = req?.body?.level || KataLevel.BASIC;
    const intents: number = req?.body?.intents || 0;
    const stars: number = req?.body?.stars || 0;
    const creator: string = req?.body?.creator;
    const solution: string = req?.body?.solution || 'Default Solution';
    const participants: string[] = req?.body?.participants || [];

    if (
      name &&
      description &&
      level &&
      intents >= 0 &&
      stars >= 0 &&
      creator &&
      solution &&
      participants.length >= 0
    ) {
      // Create new Controller instance in order to excute its methods
      const controller: KataController = new KataController();

      const kata: IKata = {
        name,
        description,
        level,
        intents,
        stars,
        creator,
        solution,
        participants,
      };

      // Get Response
      const response: any = await controller.createKata(kata);

      // Send response to client
      return res.status(201).send(response);
    } else {
      return res.status(400).send({
        message:
          '[ERROR] Creating Kata. You need to send all attributes of Kata to create it',
      });
    }
  });

// Export Katas Router
export default kataRouter;
