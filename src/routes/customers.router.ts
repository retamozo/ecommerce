import { Router } from 'express';
import {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema
} from '@schemas/customer.schema';
import { validatorHandler } from '@middlewares/validator.handler';
import { FieldSource } from '@custom-types/schemas';
import {
  createCustomerController,
  getAllCustomersController,
  getCustomerById,
  patchCustomerControler
} from '@controllers/customer';

const router = Router();

const validateCreateCustomer = validatorHandler(
  createCustomerSchema,
  FieldSource.Body
);

const validateGetCustomer = validatorHandler(
  getCustomerSchema,
  FieldSource.Params
);

const validatePartialCustomerUpdate = [
  validatorHandler(getCustomerSchema, FieldSource.Params),
  validatorHandler(updateCustomerSchema, FieldSource.Body)
];

router.get('/', getAllCustomersController);

router.post('/', validateCreateCustomer, createCustomerController);

router.get('/:id', validateGetCustomer, getCustomerById);

router.patch('/:id', validatePartialCustomerUpdate, patchCustomerControler);

router.delete('/:id', validateGetCustomer);

export default router;
