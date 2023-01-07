import { Pool } from "pg"
import { parse } from "pg-connection-string"
// pools will connect through env vars and parse automatically
// https://github.com/brianc/node-postgres/tree/master/packages/pg-connection-string
const connectionString = parse('postgres://PGUSER:PGPASSWORD@PGHOST:PGPORT/PGDATABASE').client_encoding

export const pool = new Pool({
  connectionString
})

