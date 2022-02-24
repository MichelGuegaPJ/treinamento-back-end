import path from 'path';
import fs from 'fs';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';

import uploadConfig from '../../../config/upload';

interface IRequest {
  user_id: string;
  filename: string;
}
export default class AuthenticationService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute({
    user_id,
    filename,
  }: IRequest): Promise<User | undefined> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found');

    if (user.photo) {
      const userPhotoFilePath = path.join(uploadConfig.directory, user.photo);
      const userPhotoFileExists = await fs.promises.stat(userPhotoFilePath);

      if (userPhotoFileExists) {
        await fs.promises.unlink(userPhotoFilePath);
      }
    }

    user.photo = filename;
    await this.usersRepository.save(user);
    user.password = '###';
    return user;
  }
}
