import { ResponseWithDate } from './types';
import { IGoodbyeController } from './interfaces';
import { LogSuccess } from '../utils/logger';

export class GoodbyeController implements IGoodbyeController {
  public async getMessage(name?: string): Promise<ResponseWithDate> {
    LogSuccess('[/api/goodbye] Get Request');

    return {
      message: `Goodbye, ${name || 'World'}`,
      date: new Date().toISOString().split('T')[0]
    };
  }
}
