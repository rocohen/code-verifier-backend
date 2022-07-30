import express, { Request, Response } from 'express';
import { KataController } from '../controller/KataController';
import { IKata } from '../domain/interfaces/Ikata.interface';
import { LogInfo } from '../utils/logger';

// Router from express
const kataRouter = express.Router();

// http://localhost:8000/api/katas/
kataRouter
  .route('/')
  // GET:
  .get(async (req: Request, res: Response) => {
    // Obtain a Query Param
    const id: any = req?.query?.id;
    const level: any = req?.query?.level;
    const sort: any = req?.query?.sort;
    LogInfo(`Query Param: ${id}, ${level}, ${sort}`);

    // Pagination
    const page: number = Number(req?.query?.page) || 1;
    const limit: number = Number(req?.query?.limit) || 10;

    // Controller Instance method to execute
    const controller: KataController = new KataController();
    // Obtain Response
    const response: any = await controller.getKatas(page, limit, id, level, sort);
    // Send response to client
    return res.send(response);
  })
  // DELETE
  .delete(async (req: Request, res: Response) => {
    // Obtain a Query Param
    const id: any = req?.query?.id;
    LogInfo(`Query Param: ${id}`);
    // Controller Instance method to execute
    const controller: KataController = new KataController();
    // Obtain Response
    const response: any = await controller.deleteKata(id);
    // Send response to client
    return res.send(response);
  })
  // POST
  .post(async (req: Request, res: Response) => {
    const name = req?.body?.name || 'default name';
    const description = req?.body?.description || 'default description';
    const level = req?.body?.level || 'Easy';
    const author = req?.body?.author || 'John Doe';

    const kata: IKata = {
      name,
      description,
      level,
      author,
    };
    // Controller Instance method to execute
    const controller: KataController = new KataController();
    // Obtain Response
    const response: any = await controller.createKata(kata);
    // Send response to client
    return res.send(response);
  })
  // UPDATE
  .put(async (req: Request, res: Response) => {
    // Obtain a Query Param
    const id: any = req?.query?.id;
    LogInfo(`Query Param: ${id}`);

    const {
      name,
      description,
      level,
      author,
      date,
      valoration,
      peopleWhoRated,
      chances,
    } = req?.body;

    LogInfo(
      `Query Body: ${name}, ${description}, ${level}, ${author}, ${date}, ${valoration},${peopleWhoRated}, ${chances}`
    );

    const kata = {
      name,
      description,
      level,
      author,
      date,
      valoration,
      peopleWhoRated,
      chances,
    };
    // Controller Instance method to execute
    const controller: KataController = new KataController();
    // Obtain Response
    const response: any = await controller.updateKata(id, kata);
    // Send response to client
    return res.send(response);
  });

// http://localhost:8000/api/katas/:id
kataRouter
  .route('/:id')
  // Rate a kata
  .put(async (req: Request, res: Response) => {
    // Obtain a Query Param
    const id: any = req?.params?.id;
    LogInfo(`Request Param: ${id}`);
    // Body info
    const valoration: number = req?.body?.valoration;
    LogInfo(`Query Body: ${valoration}`);
    // Controller Instance method to execute
    const controller: KataController = new KataController();
    // Obtain Response
    const response: any = await controller.rateKata(id, valoration);
    // Send response to client
    return res.send(response);
  });

// Export Kata Router
export default kataRouter;
