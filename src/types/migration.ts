type Key = "development" | "production"

type Options = {
  url: string;
  dialect: "postgres" | "mysql"
}

export type Migration = Record<Key, Options>
