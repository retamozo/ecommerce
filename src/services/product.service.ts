import { notFound, conflict } from "@hapi/boom";
import { TProduct } from "@custom-types/models/product";
import sequelize from "@libs/sequelize"

const { models } = sequelize

export class ProductsService {
  products: TProduct[];

  constructor() {}

  async create(data) {
    const product = await models.Product.create(data)
    return product
  }

  async find(query) {
    const { limit = 10, offset = 0 } = query || {}
    const res = await models.Product.findAll({
      include: ["category"],
      offset,
      limit,
    })
    return res
  }

  async findOne(id) {
    const res = await models.Product.findByPk(id, {
      include: ["category"]
    })
    return res
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw notFound("Can't update producte because it doesn't exists.");
    }

    this.products[index] = { ...this.products[index], ...changes };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error("Cannot find product to be deleted");
    }
    this.products.splice(index, 1);
    return {
      [id]: "deleted",
    };
  }
}

