import IFollowRepository from '../repositories/IFollowRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  user_id: string;
  following_name: string;
}
class FollowService {
  private usersRepository: IUsersRepository;

  private followRepository: IFollowRepository;

  constructor(
    usersRepository: IUsersRepository,
    followRepository: IFollowRepository,
  ) {
    this.usersRepository = usersRepository;
    this.followRepository = followRepository;
  }

  public async execute({
    user_id,
    following_name,
  }: IRequest): Promise<boolean | undefined> {
    const followerExists = await this.usersRepository.findByUsername(
      following_name,
    );
    if (!followerExists) throw new AppError('User not found');

    const following_id = followerExists.id;

    if (following_id === user_id) throw new AppError("Can't follow yourself");

    const data = { usersId_1: user_id, usersId_2: following_id };

    const AlreadyFollowing = await this.followRepository.findFollowByUserIdAndFollowingId(
      user_id,
      following_id,
    );

    let rep;
    if (AlreadyFollowing) {
      await this.followRepository.delete(user_id, following_id);
      rep = false;
    } else {
      const follow = await this.followRepository.create(data);
      await this.followRepository.save(follow);
      rep = true;
    }
    return rep;
  }
}

export default FollowService;
