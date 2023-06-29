import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import UFController from '../controllers/UFController';
import isAuthenticated from '../../../../../shared/http/middlewares/isAuthenticated';

const ufRouter = Router();
const ufController = new UFController();

ufRouter.use(isAuthenticated);

ufRouter.get('/', ufController.index);

ufRouter.get(
  '/:codigoUF',
  celebrate({
    [Segments.PARAMS]: {
      codigoUF: Joi.number().required(),
    },
  }),
  ufController.show,
);
ufRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      sigla: Joi.string().required(),
      nome: Joi.string().required(),
      status: Joi.number().required(),
    },
  }),
  ufController.create,
);

ufRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      codigoUF: Joi.number().required(),
      sigla: Joi.string().required(),
      nome: Joi.string().required(),
      status: Joi.number().required(),
    },
  }),
  ufController.update,
);

ufRouter.delete(
  '/:codigoUF',
  celebrate({
    [Segments.PARAMS]: {
      codigoUF: Joi.number().required(),
    },
  }),
  ufController.delete,
);

export default ufRouter;
