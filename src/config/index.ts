import dotenv from "dotenv";

dotenv.config();

// pools will connect through env vars and parse automatically
// https://github.com/brianc/node-postgres/tree/master/packages/pg-connection-string
// TODO: figure out why this refuses to work. Output is "undefined"
// const connectionString = parse('postgres://PGUSER:PGPASSWORD@PGHOST:PGPORT/PGDATABASE').client_encoding
const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DATABASE,
  NODE_ENV,
  PORT,
} = process.env;

const database = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}`;

const config = {
  env: NODE_ENV || "DEV",
  port: PORT || 3001,
  dbUser: POSTGRES_USER,
  dbPassword: POSTGRES_PASSWORD,
  dbHost: POSTGRES_HOST,
  dbName: POSTGRES_DATABASE,
  dbPort: POSTGRES_PORT,
  connectionURIString: database,
};

export default config;
