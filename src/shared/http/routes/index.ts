import { Router } from 'express';

import ufRouter from '../../../modules/ufs/infra/http/routes/UFRoutes';

const routes = Router();

routes.use('/uf', ufRouter);

export default routes;
