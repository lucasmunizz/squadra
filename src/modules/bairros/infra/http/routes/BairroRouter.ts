import { Router } from 'express';
import BairroController from '../controllers/BairroController';
import isAuthenticated from '../../../../../shared/http/middlewares/isAuthenticated';

const bairroRouter = Router();
const bairroController = new BairroController();

bairroRouter.use(isAuthenticated);

bairroRouter.get('/', bairroController.index);
bairroRouter.post('/', bairroController.create);
bairroRouter.put('/', bairroController.update);
bairroRouter.delete('/:codigoBairro', bairroController.delete);

export default bairroRouter;
