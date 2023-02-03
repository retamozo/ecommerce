import { OrderService } from '@services/order.service';
import { NextFunction, Request, Response } from 'express';

const orderService = new OrderService();

export const createOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const customer = await orderService.create(body);
    res.status(201).json({
      message: 'created',
      customer
    });
  } catch (e) {
    next(e);
  }
};

export const addItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const { id: orderId } = req.params;
    const item = await orderService.addItem({ ...body, orderId });
    res.status(201).json({
      message: 'created',
      item
    });
  } catch (e) {
    next(e);
  }
};

export const getItemByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await orderService.findOne(id);
    res.json(user);
  } catch (e) {
    next(e);
  }
};

export const deleteItemById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedResponse = await orderService.delete(id);
    res.json(deletedResponse);
  } catch (e) {
    next(e);
  }
};
