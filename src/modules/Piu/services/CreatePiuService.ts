import AppError from '../../../shared/errors/AppError';
import Piu from '../infra/typeorm/entities/Pius';
import IPiusRepository from '../repositories/IPiusRepository';

interface IRequest {
  content: string;
  user_id: string;
}

export default class CreatePiuService {
  private piusRepository: IPiusRepository;

  constructor(piusRepository: IPiusRepository) {
    this.piusRepository = piusRepository;
  }

  public async execute({ content, user_id }: IRequest): Promise<Piu> {
    if (!content) throw new AppError('Empty content');
    const piu = await this.piusRepository.create({ content, user_id });
    await this.piusRepository.save(piu);
    return piu;
  }
}
