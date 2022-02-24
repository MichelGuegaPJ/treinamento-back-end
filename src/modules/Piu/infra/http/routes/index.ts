import Router from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import PiusController from '../controllers/PiusController';
import GetPiusController from '../controllers/GetPiusController';
import DeletePiuController from '../controllers/DeletePiuController';

const piuController = new PiusController();
const getPiusController = new GetPiusController();
const deletePiuController = new DeletePiuController();

const piuRoutes = Router();

piuRoutes.post('/postar-piu', ensureAuthenticated, piuController.create);

piuRoutes.get('/listar-pius', ensureAuthenticated, getPiusController.execute);

piuRoutes.delete('/deletar/:id', ensureAuthenticated, deletePiuController.execute);

piuRoutes.patch('/like', ensureAuthenticated, piuController.like);

piuRoutes.patch('/favoritar', ensureAuthenticated, piuController.favorite);

piuRoutes.get('/listar-pius/favoritos', ensureAuthenticated, getPiusController.favorites);

export default piuRoutes;
