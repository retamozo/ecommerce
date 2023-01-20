
import { notFound, conflict } from "@hapi/boom";
import sequelize from "@libs/sequelize"

const { models } = sequelize

export class OrderService {
  constructor() { }

  async create(payload) {
    const order = await models.Order.create(payload)
    return order;
  }

  async find() {
    return;
  }

  async findOne(id: string) {
    return;
  }

  async update(id: string, changes) {
    return;
  }

  async delete(id) {
    return;
  }
}
