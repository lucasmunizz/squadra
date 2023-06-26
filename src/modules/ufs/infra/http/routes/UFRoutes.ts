import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import UFController from '../controllers/UFController';

const ufRouter = Router();
const ufController = new UFController();

ufRouter.get('/', ufController.index);

ufRouter.get(
  '/:codigo_uf',
  celebrate({
    [Segments.BODY]: {
      codigo_uf: Joi.number().required(),
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
  '/:codigo_uf',
  celebrate({
    [Segments.BODY]: {
      sigla: Joi.string().required(),
      nome: Joi.string().required(),
      status: Joi.number().required(),
    },
  }),
  ufController.update,
);

export default ufRouter;
