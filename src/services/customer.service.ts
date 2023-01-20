import sequelize from "@libs/sequelize";
import { notFound, conflict } from "@hapi/boom";

const { models } = sequelize;

export class CustomerService {
  constructor() { }

  async create(body) {
    try {
      const newCustomer = await models.Customer.create(body, {
        include: ["user"],
      });
      return newCustomer;
    } catch (e) {
      throw conflict(e);
    }
  }

  async find() {
    const rta = await models.Customer.findAll({
      include: ["user"],
    });
    return rta;
  }

  async findOne(id: string) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw notFound("Customer not found");
    }
    return customer;
  }

  async update(id: string, body) {
    const customer = await this.findOne(id);
    const rta = await customer.update(body);
    return rta;
  }

  async delete(id: string) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }
}
