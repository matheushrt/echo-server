import { Config } from 'knex';
// below dotenv config is just for knex cli to work properly
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

export const development: Config = {
  migrations: {
    directory: './migrations',
    extension: 'ts',
    stub: './migration-template.ts'
  },
  client: 'postgresql',
  connection: {
    database: process.env.DATABASE_NAME,
    host: '127.0.0.1'
  }
};

export const staging = {
  client: 'postgresql',
  connection: {
    database: 'my_db',
    user: 'username',
    password: 'password'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

export const production = {
  client: 'postgresql',
  connection: {
    database: 'my_db',
    user: 'username',
    password: 'password'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
