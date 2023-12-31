import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import cors from 'cors';
import routes from './routes';
import AppError from '../errors/AppError';
import '../typeorm';
import '../container';
import swaggerDocs from '../../../swagger';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.log(error);

    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        mensagem: error.message,
        status: error.statusCode,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Server internal error',
    });
  },
);

app.listen(3333, async () => {
  'Server running at the http://localhost:3333';
  swaggerDocs(app, 3333);
});
