import User from '../infra/typeorm/entities/User';
import CreateUserDTO from '../dtos/CreateUserDTO';

interface IUserRepository {
  findUsers(username: string): Promise<User[] | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  findById(user_id: string): Promise<User | undefined>;
  profileInformations(user_id: string): Promise<User | undefined>;
  create(data: CreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
export default IUserRepository;
