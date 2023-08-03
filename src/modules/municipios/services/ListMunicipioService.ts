import { IMunicipioRepository } from '../domain/repositories/IMunicipioRepository';
import { inject, injectable } from 'tsyringe';
import Municipio from '../infra/typeorm/entities/Municipio';

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
  }: IRequest): Promise<Municipio | Municipio[]> {
    const queryBuilder =
      this.municipioRepository.createQueryBuilder('municipio');

    if (!codigoMunicipio && !codigoUF && !nome && !status) {
      const municipios = await this.municipioRepository.find();
      return municipios;
    }

    if (codigoUF) {
      queryBuilder.where('municipio.codigoUF = :codigoUF', { codigoUF });
    }

    if (nome) {
      queryBuilder.andWhere('municipio.nome LIKE :nome', { nome: `%${nome}%` });
    }

    if (codigoMunicipio) {
      queryBuilder.andWhere('municipio.codigoMunicipio = :codigoMunicipio', {
        codigoMunicipio,
      });

      if (codigoUF) {
        queryBuilder.andWhere('municipio.codigoUF = :codigoUF', { codigoUF });
      }
    }

    if (status) {
      queryBuilder.andWhere('municipio.status = :status', { status });
    }

    const municipios = await queryBuilder.getMany();

    if (codigoMunicipio && municipios.length === 1) {
      return municipios[0];
    }

    return municipios;
  }
}
