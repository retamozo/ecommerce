import { faker } from "@faker-js/faker";
import { notFound, conflict } from "@hapi/boom";
import { TProduct } from "../types/product";
import { pool as poolConnection } from "../libs/postgres"
import { Pool } from "pg";

const sleeper = (ms = 2000) => new Promise((res) => setTimeout(res, ms));

export class ProductsService {
  products: TProduct[];
  pool: Pool

  constructor() {
    this.products = [];
    this.generate();
    this.pool = poolConnection
    this.pool.on("error", (err) => console.error(err))
  }

  generate(): void {
    const createFakeProduct = () => ({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      isProhibited: faker.datatype.boolean(),
      image: faker.image.imageUrl(),
    });

    this.products = Array.from<TProduct>({ length: 4 }).map(createFakeProduct);
  }

  async create(data) {
    const brandNewProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(brandNewProduct);
    return brandNewProduct;
  }

  async find() {
    const q = "SELECT * FROM products"
    const res = await this.pool.query(q)
    return res.rows
  }

  async findOne(id) {
    await sleeper(3000);
    const product = this.products.find((prod) => prod.id === id);
    if (!product) throw notFound("Couldn't find product.");
    if (product.isProhibited)
      throw conflict("Not elegible to see this product.");
    return product;
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

