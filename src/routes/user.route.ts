import { Router } from 'express';
import { useUpload } from '../lib/useUpload';
import { useValidate } from '../lib/useValidate';
import controller from '../controllers/user.controller';
import {
  authRoute,
  changeEmailRoute,
  changePasswordRoute,
  createRoute,
  getRoute,
  updateRoute,
  uploadPhotoRoute,
  verifyEmailRoute,
} from '../validations/user.validation';

const userRouter = Router();

// hooks
const { configure } = useUpload();
const { validate } = useValidate();

const upload = configure({ fileSize: 2 * 1024 * 1024 });

userRouter.post('/create', validate(createRoute), controller.create);

userRouter.post('/auth', validate(authRoute), controller.authenticate);

userRouter.get('/:userId', validate(getRoute), controller.get);

userRouter.patch('/:userId', validate(updateRoute), controller.update);

userRouter.post(
  '/photo/upload',
  upload.single('photo'),
  validate(uploadPhotoRoute),
  controller.uploadPhoto
);

userRouter.post(
  '/email/change',
  validate(changeEmailRoute),
  controller.changeEmail
);

userRouter.post(
  '/password/change',
  validate(changePasswordRoute),
  controller.changePassword
);

export default userRouter;
