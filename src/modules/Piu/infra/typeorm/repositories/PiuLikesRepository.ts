import { EntityRepository, getRepository, Repository } from 'typeorm';
import CreatePiuLikesDTO from '../../../dtos/CreatePiuLikesDTO';
import PiuLike from '../entities/PiuLikes';

import IPiuLikesRepository from '../../../repositories/IPiuLikesRepository';

@EntityRepository(PiuLike)
export default class PiuLikesRepositoriy implements IPiuLikesRepository {
  private ormRepository: Repository<PiuLike>;

  constructor() {
    this.ormRepository = getRepository(PiuLike);
  }

  public async create(data: CreatePiuLikesDTO): Promise<PiuLike> {
    const piuLike: PiuLike = await this.ormRepository.create(data);
    return piuLike;
  }

  public async save(data: CreatePiuLikesDTO): Promise<PiuLike> {
    const piuLike = await this.ormRepository.save(data);
    return piuLike;
  }

  public async findByUserIdAndPiuId(
    user_id: string,
    piu_id: string,
  ): Promise<PiuLike | undefined> {
    const piuLike = await this.ormRepository.findOne({
      where: { user_id, piu_id },
    });
    return piuLike;
  }

  public async delete(user_id: string, piu_id: string): Promise<void> {
    const piuLike = await this.ormRepository.findOne({
      where: { user_id, piu_id },
    });
    await this.ormRepository.delete(piuLike?.id as string);
  }
}
