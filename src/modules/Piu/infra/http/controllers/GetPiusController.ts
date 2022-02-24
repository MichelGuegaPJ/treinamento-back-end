import { Request, Response } from 'express';
import PiusRepository from '../../typeorm/repositories/PiusRepository';
import PiuFavoriteRepository from '../../typeorm/repositories/PiuFavoriteRepository';
import UsersRepository from '../../../../User/infra/typeorm/repositories/UsersRepository';

import GetPiusService from '../../../services/GetPiusService';
import GetUserFavoritesService from '../../../services/GetUserFavoritesService';

interface IPiu {
  username: string;
}

export default class GetPiusController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const piu: IPiu = {
      username: request.query.username as string,
    };
    if (!piu.username) {
      piu.username = '';
    }
    const piusRepository = new PiusRepository();
    const usersRepository = new UsersRepository();
    const getPiusService = new GetPiusService(piusRepository, usersRepository);
    const pius = await getPiusService.execute(piu);
    return response.json(pius);
  }

  public async favorites(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const piusRepository = new PiusRepository();
    const piuFavoriteRepository = new PiuFavoriteRepository();
    const getUserFavoritesService = new GetUserFavoritesService(
      piusRepository,
      piuFavoriteRepository,
    );

    const pius = await getUserFavoritesService.execute({ user_id });
    return response.json(pius);
  }
}
