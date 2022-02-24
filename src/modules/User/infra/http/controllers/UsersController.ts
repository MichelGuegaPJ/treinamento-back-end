/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from 'express';

import HashProvider from '@shared/container/providers/HashProvider';
import CreateUserService from '../../../services/CreateUserService';
import GetUsersService from '../../../services/GetUsersService';

import UsersRepository from '../../typeorm/repositories/UsersRepository';

interface IUser{
    name:string
    username:string
    password:string
    birthdate:string
    email:string
}
class UsersController {
  public async create(request: Request, response: Response) {
    const user: IUser = {
      name: request.body.name,
      username: request.body.username,
      password: request.body.password,
      birthdate: request.body.birthday_date,
      email: request.body.email,
    };

    const hashProvider = new HashProvider();
    const usersRepository = new UsersRepository();

    const createUser = new CreateUserService(usersRepository, hashProvider);
    const userToReturn = await createUser.execute(user);
    return response.json(userToReturn);
  }

  public async getUsers(request: Request, response: Response) {
    let username = request.query.username as string;
    const usersRepository = new UsersRepository();
    if (!username) username = '';
    const users = await new GetUsersService(usersRepository).execute({
      username,
    });
    return response.json(users);
  }
}
export default UsersController;
