import { IBairroRepository } from '../domain/repositories/IBairroRepository';
import { inject, injectable } from 'tsyringe';
import Bairro from '../infra/typeorm/entities/Bairro';
import { ICreateBairro } from '../domain/models/ICreateBairro';
import ValidateBairroService from './ValidateBairroService';
import AppError from '../../../shared/errors/AppError';
import { IMunicipioRepository } from '../../municipios/domain/repositories/IMunicipioRepository';

@injectable()
export default class CreateBairroService {
  constructor(
    @inject('BairroRepository')
    private bairroRepository: IBairroRepository,
    @inject('MunicipioRepository')
    private municipioRepository: IMunicipioRepository,
  ) {}

  public async execute({
    codigoMunicipio,
    nome,
    status,
  }: ICreateBairro): Promise<Bairro[]> {
    const validator = new ValidateBairroService();

    validator.validate({ codigoMunicipio, nome, status });

    const municipioExists = await this.municipioRepository.findByCode(
      codigoMunicipio,
    );

    if (!municipioExists) {
      throw new AppError('Esse municipio não está cadastrada.');
    }

    const nomeMunicipioExists = await this.bairroRepository.findBairroMunicipio(
      nome,
      municipioExists,
    );

    if (nomeMunicipioExists) {
      throw new AppError('UF já possui um município com esse nome');
    }

    const bairro = await this.bairroRepository.create({
      codigoMunicipio,
      nome,
      status,
    });

    bairro.municipio = municipioExists;

    await this.bairroRepository.save(bairro);

    const bairros = await this.bairroRepository.find();
    return bairros;
  }
}
