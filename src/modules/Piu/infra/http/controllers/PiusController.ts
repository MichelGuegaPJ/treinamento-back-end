import { Request, Response } from 'express';

import CreatePiuService from '../../../services/CreatePiuService';
import LikePiuService from '../../../services/LikePiuService';
import FavoritePiuService from '../../../services/FavoritePiuService';

import PiusRepository from '../../typeorm/repositories/PiusRepository';
import PiuLikesRepository from '../../typeorm/repositories/PiuLikesRepository';
import PiuFavoriteRepository from '../../typeorm/repositories/PiuFavoriteRepository';
import UsersRepository from '../../../../User/infra/typeorm/repositories/UsersRepository';

interface IPiu {
  user_id: string;
  content: string;
}

export default class PiuController {
  public async create(request: Request, response: Response): Promise<Response> {
    const piuInfos: IPiu = {
      content: request.body.content,
      user_id: request.user.id,
    };
    const piusRepository = new PiusRepository();
    const createPiuService = new CreatePiuService(piusRepository);
    const piu = await createPiuService.execute(piuInfos);
    return response.json(piu);
  }

  public async like(request: Request, response: Response): Promise<Response> {
    const { piu_id } = request.body;
    const { id: user_id } = request.user;

    const piusRepository = new PiusRepository();
    const usersRepository = new UsersRepository();
    const piuLikesRepository = new PiuLikesRepository();

    const likePiu = new LikePiuService(
      usersRepository,
      piusRepository,
      piuLikesRepository,
    );

    const statusLike = await likePiu.execute({ piu_id, user_id });
    return response.status(200).json(statusLike);
  }

  public async favorite(request: Request, response: Response): Promise<Response> {
    const { piu_id } = request.body;
    const { id: user_id } = request.user;

    const piusRepository = new PiusRepository();
    const usersRepository = new UsersRepository();
    const piuFavoriteRepository = new PiuFavoriteRepository();

    const FavoritePiu = new FavoritePiuService(
      usersRepository,
      piusRepository,
      piuFavoriteRepository,
    );

    const statusFavorite = await FavoritePiu.execute({ piu_id, user_id });
    return response.status(200).json(statusFavorite);
  }
}
