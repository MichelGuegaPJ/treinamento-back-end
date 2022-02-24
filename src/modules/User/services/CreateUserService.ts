import IHashProvider from '@shared/container/providers/IHashProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  username: string;
  password: string;
}
class CreateUserService {
  private usersRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  constructor(usersRepository: IUsersRepository, hashProvider: IHashProvider) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({
    name,
    email,
    username,
    password,
  }: IRequest): Promise<User> {
    const isUsedEmail = await this.usersRepository.findByEmail(email);
    if (isUsedEmail) {
      throw new AppError('E-mail already used');
    }
    const isUsernameUsed = await this.usersRepository.findByUsername(username);
    if (isUsernameUsed) {
      throw new AppError('Username already used');
    }
    const hashPassword = await this.hashProvider.generateHash(password);
    const user = await this.usersRepository.create({
      name,
      email,
      username,
      password: hashPassword,
    });
    await this.usersRepository.save(user);
    user.password = '###';
    return user;
  }
}

export default CreateUserService;
