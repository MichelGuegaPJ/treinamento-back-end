import Follow from '../infra/typeorm/entities/Follow';
import CreateFollowingDTO from '../dtos/CreateFollowingDTO';

interface IFollowRepository {
  create(data: CreateFollowingDTO): Promise<Follow>;
  save(data: Follow): Promise<void>;
  findFollowByUserIdAndFollowingId(
    user_id: string,
    following_id: string
  ): Promise<Follow | undefined>;
  delete(user_id: string, following_id: string): Promise<void>;
  findFollowingUsers(user_id: string): Promise<Follow[]>;
  findFollowersUsers(user_id: string): Promise<Follow[]>;
}
export default IFollowRepository;
