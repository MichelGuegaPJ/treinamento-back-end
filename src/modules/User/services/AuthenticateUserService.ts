import { sign } from 'jsonwebtoken';
import IHashProvider from '@shared/container/providers/IHashProvider';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import auth from '../../../config/auth';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  email: string;
  password: string;
}
export default class AuthenticationService {
  private usersRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  constructor(usersRepository: IUsersRepository, hashProvider: IHashProvider) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({
    email,
    password,
  }: IRequest): Promise<{ user: User; token: string }> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new AppError('User not Found');
    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );
    if (!passwordMatched) throw new AppError('Incorrect password');
    const { secret, expiresIn } = auth.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    user.password = '###';
    return { user, token };
  }
}
