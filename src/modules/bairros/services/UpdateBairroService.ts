import { IBairroRepository } from '../domain/repositories/IBairroRepository';
import { inject, injectable } from 'tsyringe';
import Bairro from '../infra/typeorm/entities/Bairro';
import ValidateBairroService from './ValidateBairroService';
import AppError from '../../../shared/errors/AppError';
import { IMunicipioRepository } from '../../municipios/domain/repositories/IMunicipioRepository';

interface IRequest {
  codigoBairro: number;
  codigoMunicipio: number;
  nome: string;
  status: number;
}

@injectable()
export default class UpdateBairroService {
  constructor(
    @inject('BairroRepository')
    private bairroRepository: IBairroRepository,
    @inject('MunicipioRepository')
    private municipioRepository: IMunicipioRepository,
  ) {}

  public async execute({
    codigoBairro,
    codigoMunicipio,
    nome,
    status,
  }: IRequest): Promise<Bairro[]> {
    if (!codigoBairro) {
      throw new AppError('O campo codigoBairro é obrigatório');
    }

    if (typeof codigoBairro !== 'number') {
      throw new AppError('O campo codigoBairro deve ser number');
    }

    const validator = new ValidateBairroService();

    validator.validate({ codigoMunicipio, nome, status });

    const bairro = await this.bairroRepository.findByCode(codigoBairro);

    if (!bairro) {
      throw new AppError('Esse bairro não está cadastrado');
    }

    const municipioExists = await this.municipioRepository.findByCode(
      codigoMunicipio,
    );

    if (!municipioExists) {
      throw new AppError('Esse municipio não está cadastrado.');
    }

    const nomeMunicipioExists = await this.bairroRepository.findBairroMunicipio(
      nome,
      municipioExists,
    );

    if (nomeMunicipioExists) {
      throw new AppError('Município já possui um bairro com esse nome');
    }

    bairro.codigoMunicipio = codigoMunicipio;
    bairro.nome = nome;
    bairro.status = status;

    await this.bairroRepository.save(bairro);

    const bairros = await this.bairroRepository.find();
    return bairros;
  }
}
