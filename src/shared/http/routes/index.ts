import { Router } from 'express';

import ufRouter from '../../../modules/ufs/infra/http/routes/UFRoutes';
import municipioRouter from '../../../modules/municipios/infra/http/routes/MunicipioRoutes';
import bairroRouter from '../../../modules/bairros/infra/http/routes/BairroRouter';

const routes = Router();

routes.use('/uf', ufRouter);
routes.use('/municipio', municipioRouter);
routes.use('/bairro', bairroRouter);

export default routes;
