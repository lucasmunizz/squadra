import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import BairroController from '../controllers/BairroController';
import Bairro from '../../typeorm/entities/Bairro';

const bairroRouter = Router();
const bairroController = new BairroController();

bairroRouter.get('/', bairroController.index);

export default bairroRouter;
