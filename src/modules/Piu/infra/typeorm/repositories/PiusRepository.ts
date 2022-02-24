/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import CreatePiuDTO from '../../../dtos/CreatePiuDTO';
import Piu from '../entities/Pius';
import IPiusRepository from '../../../repositories/IPiusRepository';

@EntityRepository(Piu)
export default class PiusRepositoriy implements IPiusRepository {
  private ormRepository: Repository<Piu>;

  constructor() {
    this.ormRepository = getRepository(Piu);
  }

  public async create(data: CreatePiuDTO): Promise<Piu> {
    const piu: Piu = await this.ormRepository.create(data);
    return piu;
  }

  public async save(data: CreatePiuDTO): Promise<Piu> {
    const piu = await this.ormRepository.save(data);
    return piu;
  }

  public async findById(piu_id: string): Promise<Piu | undefined> {
    const piu = await this.ormRepository.findOne({
      where: { id: piu_id },
    });
    return piu;
  }

  public async getPius(user_id?: string): Promise<Piu[] | undefined> {
    let pius;
    if (user_id) pius = await this.ormRepository.find({ where: { user_id } });
    else pius = await this.ormRepository.find({ relations: ['likes'] });
    return pius;
  }

  public async getPiusById(pius_id: string[]): Promise<Piu[] | undefined> {
    const pius: Piu[] = [];

    for (const piu_id of pius_id) {
      const id = piu_id;
      const piu = await this.ormRepository.findOne({ where: { id } });
      if (piu) pius.push(piu);
    }
    return pius;
  }

  public async deletePiu(piu_id: string): Promise<boolean | undefined> {
    const piu = await this.ormRepository.findOne({ where: { id: piu_id } });
    await this.ormRepository.delete(piu?.id || '');
    return true;
  }
}
