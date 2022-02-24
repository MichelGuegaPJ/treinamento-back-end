import PiuLike from '../infra/typeorm/entities/PiuLikes';
import CreatePiuLikesDTO from '../dtos/CreatePiuLikesDTO';

export default interface IPiuLikesRepositories {
  create(data: CreatePiuLikesDTO): Promise<PiuLike>;
  save(data: CreatePiuLikesDTO): Promise<PiuLike>;
  findByUserIdAndPiuId(
    user_id: string,
    piu_id: string
  ): Promise<PiuLike | undefined>;
  delete(user_id: string, piu_id: string): Promise<void>;
// eslint-disable-next-line semi
}
