import { Router } from "express";
import { faker } from "@faker-js/faker"

const router = Router();

const fakeCategory = () => ({
  id: faker.datatype.uuid(),
  category: faker.commerce.productAdjective(),
  price: faker.commerce.department()
})

router.get('/', (req, res) => {
  res.json(Array.from({ length: 10 }).map(fakeCategory));
})

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params
  res.json({
    categoryId,
    productId
  })
})

export default router;
