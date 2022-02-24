import { EntityRepository, getRepository, Repository } from 'typeorm';
import User from '../entities/User';
import IUserRepository from '../../../repositories/IUsersRepository';
import CreateUserDTO from '../../../dtos/CreateUserDTO';

@EntityRepository(User)
class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findUsers(username: string): Promise<User[] | undefined> {
    let users;
    if (!username) users = await this.ormRepository.find();
    else {
      users = await this.ormRepository.find({ where: { username } });
    }

    return users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { username } });
    return user;
  }

  public async findById(user_id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { id: user_id } });
    return user;
  }

  public async profileInformations(user_id: string): Promise<User | undefined> {
    const users = await this.ormRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.likes', 'likes')
      .leftJoinAndSelect('user.pius', 'pius')
      .leftJoinAndSelect('pius.likes', 'piulikes')
      .leftJoinAndSelect('user.following', 'following')
      .leftJoinAndSelect('user.favorites', 'favorites')
      .where('user.id = :id', { id: user_id })
      .getOne();
    // const user = await this.ormRepository.findOne({
    //   where: { id: user_id },
    //   relations: ["pius","favorites","followers"], // the relation info name must to be the same name as the attribute.
    // });
    return users;
  }

  public async create(data: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    return user;
  }

  public async save(data: CreateUserDTO): Promise<User> {
    const user = await this.ormRepository.save(data);
    return user;
  }
}
export default UserRepository;
