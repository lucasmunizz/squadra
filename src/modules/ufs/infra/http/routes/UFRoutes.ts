import { Router } from 'express';
import UFController from '../controllers/UFController';
import isAuthenticated from '../../../../../shared/http/middlewares/isAuthenticated';

const ufRouter = Router();
const ufController = new UFController();

ufRouter.use(isAuthenticated);

ufRouter.get('/', ufController.index);

ufRouter.post('/', ufController.create);

ufRouter.put('/', ufController.update);

ufRouter.delete('/:codigoUF', ufController.delete);

export default ufRouter;
