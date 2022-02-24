/* eslint-disable semi */
import Piu from '../infra/typeorm/entities/Pius';
import CreatePiuDTO from '../dtos/CreatePiuDTO';

export default interface IPiusRepositories {
  create(data: CreatePiuDTO): Promise<Piu>;
  save(piu: Piu): Promise<Piu>;
  findById(piu_id: string): Promise<Piu | undefined>;
  getPius(user_id: string): Promise<Piu[] | undefined>;
  getPiusById(pius_id: string[]): Promise<Piu[] | undefined>;
  deletePiu(piu_id: string): Promise<boolean | undefined>;
}
