import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../../User/repositories/IUsersRepository';
import IPiuFavoriteRepository from '../repositories/IPiuFavoriteRepository';
import IPiusRepository from '../repositories/IPiusRepository';

interface IRequest {
  piu_id: string;
  user_id: string;
}

export default class LikePiuService {
  private piusRepository: IPiusRepository;

  private usersRepository: IUsersRepository;

  private piuFavoriteRepository: IPiuFavoriteRepository;

  constructor(
    usersRepository: IUsersRepository,
    piusRepository: IPiusRepository,
    piuFavoriteRepository: IPiuFavoriteRepository,
  ) {
    this.piusRepository = piusRepository;
    this.usersRepository = usersRepository;
    this.piuFavoriteRepository = piuFavoriteRepository;
  }

  public async execute({ piu_id, user_id }: IRequest): Promise<boolean> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) throw new AppError('User doesnt exists');

    const piu = await this.piusRepository.findById(piu_id);
    if (!piu) throw new AppError('Piu doesnt exists');

    const piuFavorite = await this.piuFavoriteRepository.findByUserIdAndPiuId(
      user_id,
      piu_id,
    );
    let resp;
    if (piuFavorite) {
      await this.piuFavoriteRepository.delete(user_id, piu_id);
      resp = false;
    } else {
      const favorite = await this.piuFavoriteRepository.create({
        user_id,
        piu_id,
      });
      await this.piuFavoriteRepository.save(favorite);
      resp = true;
    }
    return resp;
  }
}
