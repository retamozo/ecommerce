import { notFound, conflict } from "@hapi/boom";
import sequelize from "@libs/sequelize"

const { models } = sequelize

export class UserService {
  constructor() { }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll({
      include: ["customer"]
    });
    return rta;
  }

  async findOne(id: string) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw notFound('user not found');
    }
    return user;
  }

  async update(id: string, changes) {
    const user = await this.findOne(id)
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id)
    await user.destroy()
    return { id }
  }
}

