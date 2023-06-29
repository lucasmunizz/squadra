import { Router } from 'express';
import PessoaController from '../controllers/PessoaController';

const pessoaRouter = Router();
const pessoaController = new PessoaController();

pessoaRouter.get('/', pessoaController.index);
pessoaRouter.post('/', pessoaController.create);

export default pessoaRouter;
