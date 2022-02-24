import IUsersRepository from '@modules/User/repositories/IUsersRepository';
import AppError from '../../../shared/errors/AppError';
import IPiuLikesRepository from '../repositories/IPiuLikesRepository';
import IPiusRepository from '../repositories/IPiusRepository';

interface IRequest {
  piu_id: string;
  user_id: string;
}

export default class LikePiuService {
  private piusRepository: IPiusRepository;

  private usersRepository: IUsersRepository;

  private piuLikesRepository: IPiuLikesRepository;

  constructor(
    usersRepository: IUsersRepository,
    piusRepository: IPiusRepository,
    piuLikesRepository: IPiuLikesRepository,
  ) {
    this.piusRepository = piusRepository;
    this.usersRepository = usersRepository;
    this.piuLikesRepository = piuLikesRepository;
  }

  public async execute({ piu_id, user_id }: IRequest): Promise<boolean> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) throw new AppError('User doesnt exists');

    const piu = await this.piusRepository.findById(piu_id);
    if (!piu) throw new AppError('Piu doesnt exists');

    const piuLike = await this.piuLikesRepository.findByUserIdAndPiuId(
      user_id,
      piu_id,
    );
    let resp;
    if (piuLike) {
      await this.piuLikesRepository.delete(user_id, piu_id);
      resp = false;
    } else {
      const like = await this.piuLikesRepository.create({ user_id, piu_id });
      await this.piuLikesRepository.save(like);
      resp = true;
    }
    return resp;
  }
}
