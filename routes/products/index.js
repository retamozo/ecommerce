const express = require('express');
const { ProductsService } = require('../../services');
const { validatorHandler } = require('../../middlewares');
const {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
} = require('../../schemas');

const router = express.Router();

const validateCreateProduct = validatorHandler(createProductSchema, 'body');

const validateGetProduct = validatorHandler(getProductSchema, 'params');

const validatePartialUpdate = [
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
];

const productService = new ProductsService();

router.get('/', async (req, res) => {
  const { limit = 10, offset } = req.query;
  const prods = await productService.find();
  res.json(prods);
});

router.get('/filter', (req, res) => {
  res.send('filter');
});

router.get('/:id', validateGetProduct, async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.findOne(id);
    res.json(product);
  } catch (e) {
    next(e);
  }
});
router.post('/', validateCreateProduct, async (req, res) => {
  const body = req.body;
  const newProd = await productService.create(body);
  return res.status(201).json({
    message: 'created',
    data: newProd,
  });
});

router.patch('/:id', validatePartialUpdate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const partialUpdatedProduct = await productService.update(id, req.body);
    res.json(partialUpdatedProduct);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedResponse = await productService.delete(id);
    res.json(deletedResponse);
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
  }
});

module.exports = router;
