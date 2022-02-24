import { EntityRepository, getRepository, Repository } from 'typeorm';
import CreatePiuFavoriteDTO from '../../../dtos/CreatePiuFavoriteDTO';
import PiuFavorite from '../entities/PiuFavorite';
import IPiuFavoriteRepository from '../../../repositories/IPiuFavoriteRepository';

@EntityRepository(PiuFavorite)
export default class PiuLikesRepositoriy implements IPiuFavoriteRepository {
  private ormRepository: Repository<PiuFavorite>;

  constructor() {
    this.ormRepository = getRepository(PiuFavorite);
  }

  public async create(data: CreatePiuFavoriteDTO): Promise<PiuFavorite> {
    const piuFavorite: PiuFavorite = await this.ormRepository.create(data);
    return piuFavorite;
  }

  public async save(data: CreatePiuFavoriteDTO): Promise<PiuFavorite> {
    const piuFavorite = await this.ormRepository.save(data);
    return piuFavorite;
  }

  public async findByUserIdAndPiuId(
    user_id: string,
    piu_id: string,
  ): Promise<PiuFavorite | undefined> {
    const piuFavorite = await this.ormRepository.findOne({
      where: { user_id, piu_id },
    });
    return piuFavorite;
  }

  public async delete(user_id: string, piu_id: string): Promise<void> {
    const piuFavorite = await this.ormRepository.findOne({
      where: { user_id, piu_id },
    });
    await this.ormRepository.delete(piuFavorite?.id || '');
  }

  public async findPiusFavorites(user_id: string): Promise<string[]> {
    const piusFavorites = await this.ormRepository.find({
      where: { user_id },
    });
    const pius_ids_favorites: string[] = [];
    piusFavorites.forEach((piu) => {
      pius_ids_favorites.push(piu.piu_id);
    });
    return pius_ids_favorites;
  }
}
