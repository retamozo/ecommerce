import dotenv from "dotenv";

dotenv.config();

// pools will connect through env vars and parse automatically
// https://github.com/brianc/node-postgres/tree/master/packages/pg-connection-string
// TODO: figure out why this refuses to work. Output is "undefined"
// const connectionString = parse('postgres://PGUSER:PGPASSWORD@PGHOST:PGPORT/PGDATABASE').client_encoding
const {
  PGUSER,
  PGPASSWORD,
  PGHOST,
  PGPORT,
  PGDATABASE,
  NODE_ENV,
  PORT,
} = process.env;

const database = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`;

const config = {
  env: NODE_ENV || "DEV",
  port: PORT || 3000,
  dbUser: PGUSER,
  dbPassword: PGPASSWORD,
  dbHost: PGHOST,
  dbName: PGDATABASE,
  dbPort: PGPORT,
  connectionURIString: database,
};

export default config;
