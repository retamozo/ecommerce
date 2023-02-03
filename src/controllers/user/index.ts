import { NextFunction, Request, Response } from 'express';
import { UserService } from '@services/users.service';

const userService = new UserService();

export const getUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await userService.findOne(id);
    res.json(product);
  } catch (e) {
    next(e);
  }
};

export const getAllUsersController = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prods = await userService.find();
    res.json(prods);
  } catch (e) {
    next(e);
  }
};

export const createAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const user = await userService.create(body);
    res.status(201).json({
      message: 'created',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const patchUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const partialUpdatedProduct = await userService.update(id, req.body);
    res.json(partialUpdatedProduct);
  } catch (e) {
    next(e);
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedResponse = await userService.delete(id);
    res.json(deletedResponse);
  } catch (e) {
    next(e);
  }
};
