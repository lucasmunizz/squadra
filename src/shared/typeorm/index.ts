import 'reflect-metadata';
import { createConnection } from 'typeorm';

const connect = async () => {
  await createConnection();
};

connect();
