import { Request, Response } from 'express';

import UsersRepository from '../../typeorm/repositories/UsersRepository';
import FollowingRepository from '../../typeorm/repositories/FollowRepository';

import FollowService from '../../../services/FollowService';
import GetFollowingService from '../../../services/GetFollowingService';
import GetFollowersService from '../../../services/GetFollowersService';

export default class FollowingController {
  public async execute(request: Request, response: Response): Promise<Response> {
    const { following_name } = request.body;
    const user_id = request.user.id;
    const usersRepository = new UsersRepository();
    const followerRepository = new FollowingRepository();
    const followService = new FollowService(
      usersRepository,
      followerRepository,
    );
    const responseService = await followService.execute({
      user_id,
      following_name,
    });
    return response.json(responseService);
  }

  public async getFollowings(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const { username } = request.body;
    const followerRepository = new FollowingRepository();
    const usersRepository = new UsersRepository();
    const getFollowingService = new GetFollowingService(
      followerRepository,
      usersRepository,
    );
    const responseService = await getFollowingService.execute({
      user_id,
      username,
    });
    return response.json(responseService);
  }

  public async getFollowers(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const { username } = request.body;
    const followerRepository = new FollowingRepository();
    const usersRepository = new UsersRepository();
    const getFollowersService = new GetFollowersService(
      followerRepository,
      usersRepository,
    );
    const responseService = await getFollowersService.execute({ user_id, username });
    return response.json(responseService);
  }
}
