import { parse } from "pg-connection-string";
import dotenv from "dotenv"

dotenv.config({ encoding: "latin1" })

// pools will connect through env vars and parse automatically
// https://github.com/brianc/node-postgres/tree/master/packages/pg-connection-string
const connectionString = parse('postgres://PGUSER:PGPASSWORD@PGHOST:PGPORT/PGDATABASE').client_encoding

const config = {
  env: process.env.NODE_ENV || "DEV",
  port: process.env.PORT || 3000,
  dbUser: process.env.PGUSER,
  dbPassword: process.env.PGPASSWORD,
  dbHost: process.env.PGHOST,
  dbName: process.env.PGDATABASE,
  dbPort: process.env.PGPORT,
  connectionURIString: connectionString,
}

export default config
