import Router from 'express';
import multer from 'multer';

import UsersController from '../controllers/UsersController';
import SessionsController from '../controllers/SessionsController';
import UpdatePhotoController from '../controllers/UpdatePhotoController';
import ProfileController from '../controllers/ProfileController';
import FollowController from '../controllers/FollowController';
import ensureAuthenticated from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';

import upladoConfig from '../../../../../config/upload';

const router = Router();

const upload = multer(upladoConfig);

const usersController = new UsersController();
const sessionsController = new SessionsController();
const updatePhotoController = new UpdatePhotoController();
const profileController = new ProfileController();
const followController = new FollowController();

router.post('/register', usersController.create);

router.post('/login', sessionsController.create);

router.patch(
  '/profile/update-photo',
  ensureAuthenticated,
  upload.single('file'),
  updatePhotoController.create,
);

router.get('/profile', ensureAuthenticated, profileController.execute);

router.get('/listar-usuarios', usersController.getUsers);

router.patch('/follow', ensureAuthenticated, followController.execute);

router.post(
  '/listar-followings',
  ensureAuthenticated,
  followController.getFollowings,
);

router.post(
  '/listar-followers',
  ensureAuthenticated,
  followController.getFollowers,
);

export default router;
