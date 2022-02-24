/* eslint-disable semi */
import PiuFavorite from '../infra/typeorm/entities/PiuFavorite';
import CreatePiuFavoriteDTO from '../dtos/CreatePiuFavoriteDTO';

export default interface IPiuLikesRepositories {
  create(data: CreatePiuFavoriteDTO): Promise<PiuFavorite>;
  save(data: CreatePiuFavoriteDTO): Promise<PiuFavorite>;
  findByUserIdAndPiuId(
    user_id: string,
    piu_id: string
  ): Promise<PiuFavorite | undefined>;
  delete(user_id: string, piu_id: string): Promise<void>;
  findPiusFavorites(user_id:string):Promise<string[]>
}
