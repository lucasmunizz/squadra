import AppError from '../../../shared/errors/AppError';

import { IUFRepository } from '../../ufs/domain/repositories/IUFRepository';
import { IMunicipioRepository } from '../domain/repositories/IMunicipioRepository';
import { inject, injectable } from 'tsyringe';
import ValidateUFService from './ValidateUFService';
import Municipio from '../infra/typeorm/entities/Municipio';

interface IRequest {
  codigoMunicipio: number;
  codigoUF: number;
  nome: string;
  status: number;
}

@injectable()
export default class UpdateMunicipioService {
  constructor(
    @inject('UFRepository')
    private ufsRepository: IUFRepository,
    @inject('MunicipioRepository')
    private municipioRepository: IMunicipioRepository,
  ) {}

  public async execute({
    codigoMunicipio,
    codigoUF,
    nome,
    status,
  }: IRequest): Promise<Municipio[]> {
    if (!codigoMunicipio) {
      throw new AppError('O campo codigoMunicipio é obrigatório');
    }

    if (typeof codigoMunicipio !== 'number') {
      throw new AppError('O campo codigoMunicipio deve ser um número');
    }

    const validator = new ValidateUFService();

    validator.validate({ codigoUF, nome, status });

    const municipio = await this.municipioRepository.findByCode(
      codigoMunicipio,
    );

    if (!municipio) {
      throw new AppError('Esse município não está cadastrado');
    }

    const ufExists = await this.ufsRepository.findByCode(codigoUF);

    if (!ufExists) {
      throw new AppError('Essa UF não está cadastrada.');
    }

    if (ufExists.status === 2) {
      throw new AppError('Essa UF está como status 2 (inválida)');
    }

    const nomeMunicipioExists = await this.municipioRepository.findMunicipioUF(
      nome,
      ufExists,
    );

    if (nomeMunicipioExists) {
      throw new AppError('UF já possui um município com esse nome');
    }

    municipio.codigoUF = codigoUF;
    municipio.nome = nome;
    municipio.status = status;

    await this.municipioRepository.save(municipio);

    const municipios = await this.municipioRepository.find();
    return municipios;
  }
}
