const router = require("express").Router()
const { faker } = require("@faker-js/faker")

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

module.exports = router
