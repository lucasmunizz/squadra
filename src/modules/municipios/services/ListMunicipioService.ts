import { IMunicipioRepository } from '../domain/repositories/IMunicipioRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  codigoMunicipio: number;
  codigoUF: number;
  nome: any;
  status: number;
}

@injectable()
export default class ListMunicipioService {
  constructor(
    @inject('MunicipioRepository')
    private municipioRepository: IMunicipioRepository,
  ) {}

  public async execute({
    codigoMunicipio,
    codigoUF,
    nome,
    status,
  }: IRequest): Promise<any> {
    const queryBuilder =
      this.municipioRepository.createQueryBuilder('municipio');

    if (!codigoMunicipio && !codigoUF && !nome && !status) {
      const municipios = await this.municipioRepository.find();
      return municipios;
    }

    if (codigoUF) {
      queryBuilder.where('municipio.codigoUF = :codigoUF', { codigoUF });
    }

    if (status) {
      queryBuilder.where('municipio.status = :status', { status });
    }
    if (nome) {
      queryBuilder.andWhere('municipio.nome LIKE :nome', { nome: `%${nome}%` });
    }
    if (codigoMunicipio) {
      queryBuilder.andWhere('municipio.codigoMunicipio = :codigoMunicipio', {
        codigoMunicipio,
      });
    }

    const municipios = await queryBuilder.getMany();

    if (
      codigoMunicipio &&
      !codigoUF &&
      !nome &&
      !status &&
      municipios.length > 0
    ) {
      return municipios[0];
    } else {
      return municipios;
    }
  }
}
