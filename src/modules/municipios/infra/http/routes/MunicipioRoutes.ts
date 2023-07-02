import { Router } from 'express';
import MunicipioController from '../controllers/MunicipioController';
import isAuthenticated from '../../../../../shared/http/middlewares/isAuthenticated';

const municipioRouter = Router();
const municipioController = new MunicipioController();

municipioRouter.use(isAuthenticated);

municipioRouter.get('/', municipioController.index);

municipioRouter.put('/', municipioController.update);

municipioRouter.delete('/:codigoMunicipio', municipioController.delete);

municipioRouter.post('/', municipioController.create);

export default municipioRouter;
