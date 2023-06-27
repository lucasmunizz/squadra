import { Router } from 'express';

import ufRouter from '../../../modules/ufs/infra/http/routes/UFRoutes';
import municipioRouter from '../../../modules/municipios/infra/http/routes/MunicipioRoutes';

const routes = Router();

routes.use('/uf', ufRouter);
routes.use('/municipio', municipioRouter);

export default routes;
