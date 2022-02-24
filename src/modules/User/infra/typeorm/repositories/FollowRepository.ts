import { getRepository, Repository, EntityRepository } from 'typeorm';
import Follow from '../entities/Follow';
import IFollowRepository from '../../../repositories/IFollowRepository';
import CreateFollowingDTO from '../../../dtos/CreateFollowingDTO';

@EntityRepository(Follow)
class FollowRepository implements IFollowRepository {
  private ormRepository: Repository<Follow>;

  constructor() {
    this.ormRepository = getRepository(Follow);
  }

  public async create(data: CreateFollowingDTO): Promise<Follow> {
    const follow = this.ormRepository.create(data);
    return follow;
  }

  public async save(data: Follow): Promise<void> {
    await this.ormRepository.save(data);
  }

  public async findFollowByUserIdAndFollowingId(
    usersId_1: string,
    usersId_2: string,
  ): Promise<Follow | undefined> {
    const follow = await this.ormRepository.findOne({
      where: { usersId_1, usersId_2 },
    });
    return follow;
  }

  public async delete(usersId_1: string, usersId_2: string): Promise<void> {
    const follow = await this.ormRepository.findOne({
      where: { usersId_1, usersId_2 },
    });
    await this.ormRepository.delete(follow?.id || '');
  }

  public async findFollowingUsers(user_id: string): Promise<Follow[]> {
    const follow = await this.ormRepository.find({
      where: { usersId_1: user_id }, // achando quem user_id está seguindo
    });
    return follow;
  }

  public async findFollowersUsers(user_id: string): Promise<Follow[]> {
    const follow = await this.ormRepository.find({
      where: { usersId_2: user_id }, // achando quem está seguindo user_id
    });
    return follow;
  }
}
export default FollowRepository;
