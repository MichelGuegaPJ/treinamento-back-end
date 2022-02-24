import { Request, Response } from 'express';
import AppError from '../../../../../shared/errors/AppError';

import UsersRepository from '../../typeorm/repositories/UsersRepository';
import UpdatePhotoService from '../../../services/UpdatePhotoService';

export default class UpdatePhotoController {
  public async create(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const updatePhotoService = new UpdatePhotoService(usersRepository);
    if (!request?.file?.filename) throw new AppError('Missing file');

    const user = await updatePhotoService.execute({
      user_id: request.user.id,
      filename: request.file.filename,
    });

    return response.json(user);
  }
}
