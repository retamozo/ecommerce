import { CategoryService } from '@services/category.service';
import { NextFunction, Request, Response } from 'express';

const categoryService = new CategoryService();

export const getAllCategoriesController = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryService.find();
    res.json(category);
  } catch (e) {
    next(e);
  }
};

export const getCategoryByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const category = await categoryService.findOne(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const createCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newCategory = await categoryService.create(body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

export const patchCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const category = await categoryService.update(id, body);
    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await categoryService.delete(id);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};
