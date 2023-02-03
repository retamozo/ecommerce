import { Router } from 'express';
import {
  createUserSchema,
  getUserSchema,
  updateUserSchema
} from '@schemas/user.schema';
import { validatorHandler } from '@middlewares/validator.handler';
import { FieldSource } from '@custom-types/schemas';
import {
  getUserByIdController,
  getAllUsersController,
  createAllUsersController,
  patchUserController,
  deleteUserController
} from '@controllers/user';

const router = Router();

const validateCreateUser = validatorHandler(createUserSchema, FieldSource.Body);

const validateGetUser = validatorHandler(getUserSchema, FieldSource.Params);

const validatePartialUserUpdate = [
  validatorHandler(getUserSchema, FieldSource.Params),
  validatorHandler(updateUserSchema, FieldSource.Body)
];

router.get('/:id', validateGetUser, getUserByIdController);

router.get('/', getAllUsersController);

router.post('/', validateCreateUser, createAllUsersController);

router.patch('/:id', validatePartialUserUpdate, patchUserController);

router.delete('/:id', validateGetUser, deleteUserController);

export default router;
