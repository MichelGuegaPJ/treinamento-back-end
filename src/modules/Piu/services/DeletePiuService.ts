import AppError from '../../../shared/errors/AppError';
import IPiusRepository from '../repositories/IPiusRepository';

interface IRequest {
  piu_id: string;
  user_id: string;
}

export default class DeletePiuService {
  private piusRepository: IPiusRepository;

  constructor(piusRepository: IPiusRepository) {
    this.piusRepository = piusRepository;
  }

  public async execute({
    piu_id,
    user_id,
  }: IRequest): Promise<boolean | undefined> {
    const piu = await this.piusRepository.findById(piu_id);
    if (!piu) throw new AppError('Piu not found');

    if (piu.user_id !== user_id) throw new AppError("You can't delete");

    const deleted = await this.piusRepository.deletePiu(piu_id);

    if (!deleted) throw new AppError('Piu not deleted', 500);
    return deleted;
  }
}
