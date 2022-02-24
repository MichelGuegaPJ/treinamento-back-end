/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import User from '../infra/typeorm/entities/User';
import IFollowRepository from '../repositories/IFollowRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}
export default class ProfileService {
  private usersRepository: IUsersRepository;

  private followRepository: IFollowRepository;

  constructor(
    usersRepository: IUsersRepository,
    followRepository: IFollowRepository,
  ) {
    this.usersRepository = usersRepository;
    this.followRepository = followRepository;
  }

  public async execute({ user_id }: IRequest): Promise<User | undefined> {
    const user = await this.usersRepository.profileInformations(user_id);
    const follow = await this.followRepository.findFollowersUsers(user_id);
    const arrayFollowing: User[] = [];
    if (follow) {
      for (const foll of follow) {
        const user = await this.usersRepository.findById(foll.usersId_1);
        if (user) arrayFollowing.push(user);
      }
    }
    arrayFollowing.forEach((user) => {
      if (user) user.password = '###';
    });
    if (user) {
      user.followers = arrayFollowing;
      user.password = '###';
    }
    return user;
  }
}
