import { Router } from 'express';
import SessaoController from '../controllers/SessaoController';

const sessaoRouter = Router();
const sessaoController = new SessaoController();

sessaoRouter.post('/', sessaoController.create);

export default sessaoRouter;
