import { CustomerService } from '@services/customer.service';
import { Request, Response, NextFunction } from 'express';

const customerService = new CustomerService();

export const getAllCustomersController = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customers = await customerService.find();
    res.json(customers);
  } catch (e) {
    next(e);
  }
};

export const createCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const customer = await customerService.create(body);
    res.status(201).json({
      message: 'created',
      customer
    });
  } catch (e) {
    next(e);
  }
};

export const getCustomerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await customerService.findOne(id);
    res.json(user);
  } catch (e) {
    next(e);
  }
};

export const patchCustomerControler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const partialUpdate = await customerService.update(id, req.body);
    res.json(partialUpdate);
  } catch (e) {
    next(e);
  }
};

export const deleteCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedResponse = await customerService.delete(id);
    res.json(deletedResponse);
  } catch (e) {
    next(e);
  }
};
