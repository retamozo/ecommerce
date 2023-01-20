import { faker } from "@faker-js/faker";
import { notFound, conflict } from "@hapi/boom";
import { TProduct } from "@custom-types/product";
import sequelize from "@libs/sequelize"

const { models } = sequelize

const sleeper = (ms = 2000) => new Promise((res) => setTimeout(res, ms));

export class ProductsService {
  products: TProduct[];

  constructor() {
    this.products = [];
    this.generate();

  }

  generate(): void {

  }

  async create(data) {
    const product = await models.Product.create(data)
    return product
  }

  async find() {
    const res = await models.Product.findAll({
      include: ["category"]
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

