import { container, delay } from 'tsyringe';

import { IUFRepository } from '../../modules/ufs/domain/repositories/IUFRepository';
import UFRepository from '../../modules/ufs/infra/typeorm/repositories/UFRepository';

import { IMunicipioRepository } from '../../modules/municipios/domain/repositories/IMunicipioRepository';
import MunicipioRepository from '../../modules/municipios/infra/typeorm/repositories/MunicipioRepository';

import { IBairroRepository } from '../../modules/bairros/domain/repositories/IBairroRepository';
import BairroRepository from '../../modules/bairros/infra/typeorm/repositories/BairroRepository';

import { IPessoaRepository } from '../../modules/pessoas/domain/repositories/IPessoaRepository';
import PessoaRepository from '../../modules/pessoas/infra/typeorm/repositories/PessoaRepository';

container.registerSingleton<IUFRepository>('UFRepository', UFRepository);
container.registerSingleton<IMunicipioRepository>(
  'MunicipioRepository',
  MunicipioRepository,
);
container.registerSingleton<IBairroRepository>(
  'BairroRepository',
  BairroRepository,
);
container.registerSingleton<IPessoaRepository>(
  'PessoaRepository',
  PessoaRepository,
);
