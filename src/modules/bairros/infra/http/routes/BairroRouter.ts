import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import BairroController from '../controllers/BairroController';
import Bairro from '../../typeorm/entities/Bairro';
import isAuthenticated from '../../../../../shared/http/middlewares/isAuthenticated';

const bairroRouter = Router();
const bairroController = new BairroController();

bairroRouter.use(isAuthenticated);

bairroRouter.get('/', bairroController.index);
bairroRouter.post('/', bairroController.create);
bairroRouter.put('/', bairroController.update);

export default bairroRouter;
