if (process.env.NODE_ENV !== 'environment') {
  import('dotenv').then(module => module.config())
}

const config = {
  env: process.env.NODE_ENV || "DEV",
  port: process.env.PORT || 3000,
  dbUser: process.env.PGUSER,
  dbPassword: process.env.PGPASSWORD,
  dbHost: process.env.PGHOST,
  dbName: process.env.PGDATABASE,
  dbPort: process.env.PGPORT
}

export default config
