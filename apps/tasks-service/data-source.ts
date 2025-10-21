import { DataSource } from 'typeorm';
import 'reflect-metadata';

console.log(process.env);

const ds = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['migrations/*{.ts,.js}'],
  ssl: process.env.DATABASE_SSL ? process.env.DATABASE_SSL === 'true' : false,
});

export default ds;
// module.exports = ds;
