import { ProductsService } from '@services/product.service';
import { NextFunction, Request, Response } from 'express';

const productService = new ProductsService();

export const getAllProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productService.find(req.query);
    res.json(products);
  } catch (e) {
    next(e);
  }
};

export const getProductByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await productService.findOne(id);
    res.json(product);
  } catch (e) {
    next(e);
  }
};

export const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newProd = await productService.create(body);
    res.status(201).json({
      message: 'created',
      data: newProd
    });
  } catch (e) {
    next(e);
  }
};

export const patchProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const partialUpdatedProduct = await productService.update(id, req.body);
    res.json(partialUpdatedProduct);
  } catch (e) {
    next(e);
  }
};

export const deleteProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedResponse = await productService.delete(id);
    res.json(deletedResponse);
  } catch (e) {
    next(e);
  }
};
