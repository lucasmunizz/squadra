import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import MunicipioController from '../controllers/MunicipioController';
import Municipio from '../../typeorm/entities/Municipio';
import isAuthenticated from '../../../../../shared/http/middlewares/isAuthenticated';

const municipioRouter = Router();
const municipioController = new MunicipioController();

municipioRouter.use(isAuthenticated);

municipioRouter.get('/', municipioController.index);

municipioRouter.put('/', municipioController.update);

municipioRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      codigoUF: Joi.number().required(),
      nome: Joi.string().required(),
      status: Joi.number().required(),
    },
  }),
  municipioController.create,
);

export default municipioRouter;
