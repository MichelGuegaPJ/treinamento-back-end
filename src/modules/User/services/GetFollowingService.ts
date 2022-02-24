/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import IFollowRepository from '../repositories/IFollowRepository';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  user_id: string;
  username: string;
}
class GetFollowingService {
  private followRepository: IFollowRepository;

  private usersRepository: IUsersRepository;

  constructor(
    followRepository: IFollowRepository,
    usersRepository: IUsersRepository,
  ) {
    this.followRepository = followRepository;
    this.usersRepository = usersRepository;
  }

  public async execute({ user_id, username }: IRequest): Promise<User[]> {
    const arrayFollowing: User[] = [];
    if (!username) {
      const follow = await this.followRepository.findFollowingUsers(user_id);
      if (follow) {
        for (const foll of follow) {
          const user = await this.usersRepository.findById(foll.usersId_2);
          if (user) arrayFollowing.push(user);
        }
      }
    } else {
      const user = await this.usersRepository.findByUsername(username);
      if (!user) throw new AppError('User not found');
      const follow = await this.followRepository.findFollowingUsers(user.id);
      if (follow) {
        for (const foll of follow) {
          const user = await this.usersRepository.findById(foll.usersId_2);
          if (user) arrayFollowing.push(user);
        }
      }
    }
    arrayFollowing.forEach((user) => {
      if (user) user.password = '###';
    });
    return arrayFollowing;
  }
}

export default GetFollowingService;
