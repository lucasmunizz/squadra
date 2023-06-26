import { container, delay } from 'tsyringe';

import { IUFRepository } from '../../modules/ufs/domain/repositories/IUFRepository';

import UFRepository from '../../modules/ufs/infra/typeorm/repositories/UFRepository';

container.registerSingleton<IUFRepository>('UFRepository', UFRepository);
