import { Request, Response } from 'express';

import PiusRepository from '../../typeorm/repositories/PiusRepository';

import DeletePiuService from '../../../services/DeletePiuService';

export default class DeletePiuController {
  public async execute(request: Request, response: Response): Promise<Response> {
    const { id: piu_id } = request.params;
    const piusRepository = new PiusRepository();
    const deletePiuService = new DeletePiuService(piusRepository);
    const responseService = await deletePiuService.execute({ piu_id, user_id: request.user.id });
    return response.json(responseService);
  }
}
