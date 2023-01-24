import { notFound, conflict } from "@hapi/boom";
import sequelize from "@libs/sequelize";

const { models } = sequelize;

export class OrderService {
  constructor() {}

  async create(payload) {
    const order = await models.Order.create(payload);
    return order;
  }

  async find() {
    return;
  }

  async findOne(id: string) {
    const order = models.Order.findByPk(id, {
      include: [
        {
          association: "customer",
          include: ["user"],
        },
        "items",
      ],
    });
    return order;
  }

  async addItem(payload) {
    const order = await models.OrderProduct.create(payload);
    return order;
  }

  async update(id: string, changes) {
    return;
  }

  async delete(id) {
    return;
  }
}
