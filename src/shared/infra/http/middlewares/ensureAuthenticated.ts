import { Request, Response, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';
import AppError from '../../../errors/AppError';

import auth from '../../../../config/auth';

interface ITokenPayload {
  sub: string;
  exp: number;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers;

  if (!authorization) throw new AppError('Missing token', 401);

  const [, token] = authorization.split(' ');
  try {
    const decoded = verify(token, auth.jwt.secret);
    const { sub } = decoded as ITokenPayload;
    request.user = {
      id: sub,
    };

    return next();
  } catch (e) {
    throw new AppError('Invalid token', 401);
  }
}
