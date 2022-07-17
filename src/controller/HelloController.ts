import { Get, Query, Route, Tags } from 'tsoa';
import { BasicResponse } from './types';
import { IHelloController } from './interfaces';
import { LogSuccess } from '../utils/logger';

@Route('/api/hello')
@Tags('HelloController')
export class HelloController implements IHelloController {
  /**
   * Endpoint that retrieves a "Hello {name}" message in JSON
   * @param { string | undefined } name Name of user to be greeted
   * @returns { BasicResponse } Promise of BasicResponse type
   */
  @Get('/')
  public async getMessage(@Query()name?: string): Promise<BasicResponse> {
    LogSuccess('[/api/hello] Get Request');

    return {
      message: `Hello, ${name || 'World'}`,
    };
  }
}
