/* eslint-disable no-param-reassign */
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  username: string;
}
class GetUsersService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute({ username }: IRequest): Promise<User[] | undefined> {
    let users;
    if (username === '') {
      users = await this.usersRepository.findUsers('');
    } else {
      const isUserIdValid = await this.usersRepository.findByUsername(username);
      if (!isUserIdValid) throw new AppError('User not found', 404);
      users = await this.usersRepository.findUsers(username);
    }
    if (users) {
      users.forEach((user) => {
        if (user) user.password = '###';
      });
    }
    return users;
  }
}

export default GetUsersService;
