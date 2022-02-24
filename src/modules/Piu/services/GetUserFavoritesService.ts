import IPiusRepository from '../repositories/IPiusRepository';
import IPiuFavoriteRepository from '../repositories/IPiuFavoriteRepository';
import Piu from '../infra/typeorm/entities/Pius';

interface IRequest {
  user_id: string;
}
class GetUserFavoritesService {
  private piusRepository: IPiusRepository;

  private piusFavoritesRepository: IPiuFavoriteRepository;

  constructor(
    piusRepository: IPiusRepository,
    piusFavoritesRepository: IPiuFavoriteRepository,
  ) {
    this.piusRepository = piusRepository;
    this.piusFavoritesRepository = piusFavoritesRepository;
  }

  public async execute({ user_id }: IRequest): Promise<Piu[] | undefined> {
    const pius_id = await this.piusFavoritesRepository.findPiusFavorites(
      user_id,
    );
    const piusFavorites = await this.piusRepository.getPiusById(pius_id);
    return piusFavorites;
  }
}

export default GetUserFavoritesService;
