import AppError from '../../../shared/errors/AppError';

import { ICreateMunicipio } from '../domain/models/ICreateMunicipio';
import { IUFRepository } from '../../ufs/domain/repositories/IUFRepository';
import { IMunicipioRepository } from '../domain/repositories/IMunicipioRepository';
import { inject, injectable } from 'tsyringe';
import ValidateUFService from './ValidateUFService';
import Municipio from '../infra/typeorm/entities/Municipio';

@injectable()
export default class CreateMunicipioService {
  constructor(
    @inject('UFRepository')
    private ufsRepository: IUFRepository,
    @inject('MunicipioRepository')
    private municipioRepository: IMunicipioRepository,
  ) {}

  public async execute({
    codigoUF,
    nome,
    status,
  }: ICreateMunicipio): Promise<Municipio[]> {
    const validator = new ValidateUFService();

    validator.validate({ codigoUF, nome, status });

    const ufExists = await this.ufsRepository.findByCode(codigoUF);

    if (!ufExists) {
      throw new AppError('Essa UF não está cadastrada.');
    }

    const nomeMunicipioExists = await this.municipioRepository.findMunicipioUF(
      nome,
      ufExists,
    );

    if (nomeMunicipioExists) {
      throw new AppError('UF já possui um município com esse nome');
    }

    const municipio = await this.municipioRepository.create({
      codigoUF,
      nome,
      status,
    });

    municipio.uf = ufExists;

    await this.municipioRepository.save(municipio);

    const municipios = await this.municipioRepository.find();
    return municipios;
  }
}
