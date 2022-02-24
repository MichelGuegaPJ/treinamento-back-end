import { Request, Response } from 'express';

import UsersRepository from '../../typeorm/repositories/UsersRepository';
import FollowRepository from '../../typeorm/repositories/FollowRepository';

import ProfileService from '../../../services/ProfileService';

export default class ProfileController {
  public async execute(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const followRepository = new FollowRepository();
    const profileService = new ProfileService(
      usersRepository,
      followRepository,
    );
    const user_id = request.user.id;
    const user = await profileService.execute({ user_id });
    return response.json(user);
  }
}
