import config from "@config"

export default {
  development: {
    url: config.connectionURIString,
    dialect: 'postgres',
  },
  production: {
    url: config.connectionURIString,
    dialect: 'postgres',
  },
};
