import AppError from '../../../shared/errors/AppError';

import { IUFRepository } from '../../ufs/domain/repositories/IUFRepository';
import { IMunicipioRepository } from '../domain/repositories/IMunicipioRepository';
import { inject, injectable } from 'tsyringe';
import ValidateUFService from './ValidateUpdateMunicipioService.';
import Municipio from '../infra/typeorm/entities/Municipio';
import { IUpdateMunicipio } from '../domain/models/IUpdateMunicipio';

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
  }: IUpdateMunicipio): Promise<Municipio[]> {
    const validator = new ValidateUFService();

    validator.validate({ codigoMunicipio, codigoUF, nome, status });

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

    const nomeMunicipioExists = await this.municipioRepository.findMunicipioUF(
      nome,
      ufExists,
    );

    if (
      nomeMunicipioExists &&
      municipio.codigoMunicipio !== nomeMunicipioExists.codigoMunicipio
    ) {
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
