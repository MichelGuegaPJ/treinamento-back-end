import IUsersRepository from '@modules/User/repositories/IUsersRepository';
import AppError from '../../../shared/errors/AppError';
import Piu from '../infra/typeorm/entities/Pius';
import IPiusRepository from '../repositories/IPiusRepository';

interface IRequest {
  username: string;
}

export default class GetPiusService {
  private piusRepository: IPiusRepository;

  private usersRepository: IUsersRepository;

  constructor(
    piusRepository: IPiusRepository,
    usersRepository: IUsersRepository,
  ) {
    this.piusRepository = piusRepository;
    this.usersRepository = usersRepository;
  }

  public async execute({ username }: IRequest): Promise<Piu[] | undefined> {
    const isUserIdValid = await this.usersRepository.findByUsername(username);
    let pius;
    if (username === '') {
      pius = await this.piusRepository.getPius('');
    } else {
      if (!isUserIdValid) throw new AppError('User not found', 404);
      const { id: user_id } = isUserIdValid;
      pius = await this.piusRepository.getPius(user_id);
    }
    return pius;
  }
}
