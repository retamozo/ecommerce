import sequelize from "@libs/sequelize";
import { notFound, conflict } from "@hapi/boom";

const { models } = sequelize;

export class CategoryService {
  constructor() { }

  async create(body) {
    try {
      const cat = await models.Category.create(body);
      return cat;
    } catch (e) {
      throw conflict(e);
    }
  }

  async find() {
    const rta = await models.Category.findAll();
    return rta;
  }

  async findOne(id: string) {
    const cat = await models.Category.findByPk(id, {
      include: ["products"]
    });
    if (!cat) {
      throw notFound("Category not found");
    }
    return cat;
  }

  async update(id: string, body) {
    const cat = await this.findOne(id);
    const rta = await cat.update(body);
    return rta;
  }

  async delete(id: string) {
    const cat = await this.findOne(id);
    await cat.destroy();
    return { id };
  }
}
