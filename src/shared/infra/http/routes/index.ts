import Router from 'express';
import userRoutes from '@modules/User/infra/http/routes/';
import piuRoutes from '@modules/Piu/infra/http/routes/';

const routes = Router();
routes.use(userRoutes);
routes.use('/piu', piuRoutes);

export default routes;
