import { container, delay } from 'tsyringe';

import { IUFRepository } from '../../modules/ufs/domain/repositories/IUFRepository';
import UFRepository from '../../modules/ufs/infra/typeorm/repositories/UFRepository';

import { IMunicipioRepository } from '../../modules/municipios/domain/repositories/IMunicipioRepository';
import MunicipioRepository from '../../modules/municipios/infra/typeorm/repositories/MunicipioRepository';

container.registerSingleton<IUFRepository>('UFRepository', UFRepository);
container.registerSingleton<IMunicipioRepository>(
  'MunicipioRepository',
  MunicipioRepository,
);
