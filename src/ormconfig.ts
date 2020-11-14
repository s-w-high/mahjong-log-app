export = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || "mahjong_log",
  password: process.env.DB_PASSWORD || "mahjong_log",
  database: process.env.DB_NAME || "mahjong_log",
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  seeds: ["src/seeds/CreateDummyUser.ts", "src/seeds/CreateDummyMatchLog.ts"],
  logging: false,
  migrationsRun: false /* Disable auto-run migration */,
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migrations",
  },
};
