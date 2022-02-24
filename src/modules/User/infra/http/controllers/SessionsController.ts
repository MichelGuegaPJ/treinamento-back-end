import { Request, Response } from 'express';

import HashProvider from '@shared/container/providers/HashProvider';
import AuthenticateService from '../../../services/AuthenticateUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const hashProvider = new HashProvider();
    const usersRepository = new UsersRepository();
    const authenticateUserService = new AuthenticateService(
      usersRepository,
      hashProvider,
    );
    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });
    return response.json({ user, token });
  }
}
