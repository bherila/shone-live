import { Request, Response } from 'express';

import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    if (process.env.NODE_ENV === 'dev') {
      console.log('Request: ', req);
    }
    next();
  }
}
