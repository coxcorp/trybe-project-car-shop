import { Request, Response } from 'express';
import Service from '../services';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  idLength = 'Id must have 24 hexadecimal characters',
}

abstract class Controller<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(protected service: Service<T>) { }

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T> | ResponseError,
  ): Promise<typeof res>;

  abstract read(
    _req: Request,
    res: Response<T[]> | ResponseError,
  ): Promise<typeof res>;

  abstract readOne(
    req: RequestWithBody<{ id: string }>,
    res: Response<T> | ResponseError,
  ): Promise<typeof res>;
}

export default Controller;
