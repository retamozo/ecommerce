import sequelize from '@libs/sequelize';
import { notFound, conflict } from '@hapi/boom';
import { TProduct } from '@custom-types/models/product';
import { Op, WhereOptions } from 'sequelize';
import { buildPaginationQuery, pageIndicators } from './helpers/pagination';
import { GetProductsQuery } from '@custom-types/services/product';

const { models } = sequelize;

export class ProductsService {
  async create(data) {
    const product = await models.Product.create(data);
    return product;
  }

  async find(query: Partial<GetProductsQuery>) {
    const {
      page = 0,
      size = 5,
      price = null,
      price_min = null,
      price_max = null
    } = query || {};

    // 🤢
    const where = {
      ...(price && price > 0 && { price }),
      ...(price_min &&
        price_max && {
          price: {
            [Op.between]: [+price_min, +price_max]
          }
        }),
      ...((price_min || price_max) && {
        price: {
          [price_min ? Op.gte : Op.lte]: price_min ? +price_min : +price_max
        }
      })
    };

    console.log('where', where);

    const res = await models.Product.findAndCountAll({
      include: ['category'],
      where,
      ...buildPaginationQuery({ page, size })
    });

    return {
      ...pageIndicators(res.count, size, page),
      ...res
    };
  }

  async findOne(id: string) {
    const res = await models.Product.findByPk(id, {
      include: ['category']
    });
    return res;
  }

  async update(id: string, changes) {
    // TODO
    return [];
  }

  async delete(id) {
    // TODO
    return [];
  }
}
