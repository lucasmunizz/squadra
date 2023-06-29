import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import PessoaController from '../controllers/PessoaController';
import Pessoa from '../../typeorm/entities/Pessoa';

const pessoaRouter = Router();
const pessoaController = new PessoaController();

pessoaRouter.post('/', pessoaController.create);

export default pessoaRouter;
