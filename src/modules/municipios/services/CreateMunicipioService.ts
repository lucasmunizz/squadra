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
    console.log(codigoUF);
    const validator = new ValidateUFService();

    // validator.validate({ codigoUF, nome, status });

    const ufExists = await this.ufsRepository.findByCode(codigoUF);

    console.log(ufExists);

    if (!ufExists) {
      throw new AppError('Essa UF não está cadastrada.');
    }

    // const nomeMunicipioExists = await this.municipioRepository.findByName(nome);

    // if (nomeMunicipioExists?.codigoUF.codigoUF === ufExists.codigoUF) {
    //   throw new AppError('Já existe um municipio dessa UF com esse nome');
    // }

    const municipio = await this.municipioRepository.create({
      codigoUF,
      nome,
      status,
    });

    console.log(municipio);

    const municipios = await this.municipioRepository.find();
    return municipios;
  }
}
