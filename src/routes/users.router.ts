import express from "express";
import {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
} from "@schemas/user.schema";
import { validatorHandler } from "@middlewares/validator.handler";
import { UserService } from "@services/users.service";

const router = express.Router();

const validateCreateUser = validatorHandler(createUserSchema, "body");

const validateGetUser = validatorHandler(getUserSchema, "params");

const validatePartialUserUpdate = [
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
];

const userService = new UserService();

router.get("/:id", validateGetUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await userService.findOne(id);
    res.json(product);
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res) => {
  const prods = await userService.find();
  res.json(prods);
});

router.post("/", validateCreateUser, async (req, res, next) => {
  try {
    const body = req.body;
    const user = await userService.create(body);
    res.status(201).json({
      message: "created",
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", validatePartialUserUpdate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const partialUpdatedProduct = await userService.update(id, req.body);
    res.json(partialUpdatedProduct);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedResponse = await userService.delete(id);
    res.json(deletedResponse);
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
  }
});

export default router;
